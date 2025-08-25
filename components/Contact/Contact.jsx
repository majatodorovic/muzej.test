"use client";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, usePathname } from "next/navigation";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";
import SvgWithImage from "../svg/Paths/SvgWithImage";
import SvgInput from "../svg/Paths/SvgInput";
import SvgTextArea from "../svg/Paths/SvgTextArea";

const ContactForm = ({ defaultMessage }) => {
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    page_section: "",
    customer_name: "",
    email: "",
    phone: "",
    message: defaultMessage || "",
    gcaptcha: "",
  });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isContactPage = pathname === "/kontakt";

  const [contactPageOptions] = useState([
    { id: 1, buttonText: "Prirodnjački muzej", value: "contact_page_prirodnjacki_muzej" },
    { id: 2, buttonText: "Galerija Prirodnjačkog muzeja", value: "contact_page_galerija_prirodnjackog_muzeja" },
  ]);

  const [contactPage, setContactPage] = useState(
    isContactPage
      ? contactPageOptions[0].value
      : "contact_page_centar_za_markiranje_zivotinja"
  );

  const textOptions = [
    { id: 1, buttonText: "Nađen markirani slepi miš", messageText: "Nađen markirani slepi miš. " },
    { id: 2, buttonText: "Nađena markirana ptica", messageText: "Nađena markirana ptica. " },
  ];

  const requiredFields = ["customer_name", "email", "message"];

  // Funkcija za osvežavanje reCAPTCHA tokena
  const refreshToken = useCallback(async () => {
    if (!executeRecaptcha) return;
    const newToken = await executeRecaptcha("contact_form");
    setToken(newToken);
    setFormData((prev) => ({ ...prev, gcaptcha: newToken }));
  }, [executeRecaptcha]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    const productId = searchParams.get("id");
    if (productId) {
      setFormData((prev) => ({
        ...prev,
        message: `Potrebne informacije za proizvod ${productId}`,
      }));
    }
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      page_section: contactPage,
    }));
  }, [contactPage]);

  const handleChange = ({ target }) => {
    setErrors((prev) => prev.filter((error) => error !== target.name));
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSetPredefinedText = (text) => {
    setFormData((prev) => ({ ...prev, message: text }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = requiredFields.filter((field) => !formData[field]);
    setErrors(newErrors);

    if (newErrors.length > 0) {
      setLoading(false);
      return;
    }

    await POST(`/contact/contact_page?form_section=${contactPage}`, {
      ...formData,
      customer_name: `${formData.customer_name} `,
      gcaptcha: token,
    }).then((res) => {
      if (res?.code === 200) {
        toast.success("Uspešno ste poslali poruku!", {
          position: "top-center",
          autoClose: 2000,
        });
        setFormData({
          page_section: contactPage,
          customer_name: "",
          phone: "",
          email: "",
          message: "",
          gcaptcha: token,
        });
        refreshToken(); // osveži token posle uspešnog slanja
      } else {
        toast.error("Došlo je do greške! Pokušajte ponovo.", {
          position: "top-center",
          autoClose: 2000,
        });
        refreshToken(); // osveži token i kod greške
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex items-center gap-10 max-md:flex-col">
      <form className="flex w-full flex-1 flex-col gap-6" onSubmit={handleSubmit}>
        <div className="w-1/2 text-lg font-light max-lg:w-full">
          Ako pronađete pticu ili slepog miša sa prstenom javite se
          nacionalnom Centru za markiranje životinja u Prirodnjačkom muzeju.
        </div>

        {/* Ime i prezime */}
        <div className="relative">
          <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
          <input
            required
            type="text"
            value={formData.customer_name}
            name="customer_name"
            onChange={handleChange}
            placeholder="Ime i prezime"
            className="mainInput2"
          />
        </div>

        {/* Telefon (samo na kontakt stranici) */}
        {isContactPage && (
          <div className="relative">
            <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
            <input
              type="text"
              value={formData.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Telefon"
              className="mainInput2 w-full 2xl:w-2/3"
            />
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
          <input
            required
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Adresa e-pošte"
            className="mainInput2 w-full 2xl:w-2/3"
          />
        </div>

        {/* Poruka */}
        <div className="relative">
          <SvgTextArea className="w-full 2xl:w-2/3" fill="#fff" />
          <textarea
            required
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Poruka"
            className="mainInput2 w-full py-10 2xl:w-2/3"
          />
        </div>

        {/* Opcije za kontakt */}
        {isContactPage ? (
          <div className="flex flex-col gap-4">
            {contactPageOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setContactPage(option.value)}
                className="relative w-[320px] transition-all hover:opacity-80"
              >
                <SvgButtonOne
                  className="mx-auto h-[52px] w-[320px]"
                  fill={contactPage === option.value ? "#224e35" : "transparent"}
                />
                <div className={`buttonText w-[320px] ${contactPage === option.value ? "" : "!text-primary"}`}>
                  {option.buttonText}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex w-[300px] flex-col gap-4">
            {textOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSetPredefinedText(option.messageText)}
                className="relative w-[300px] transition-all hover:opacity-80"
              >
                <SvgButtonOne className="mx-auto h-[52px] w-[300px]" fill="transparent" />
                <div className="buttonText w-[300px] !text-primary">{option.buttonText}</div>
              </button>
            ))}
          </div>
        )}

        {/* Submit dugme */}
        <div className="flex w-full 2xl:w-2/3">
          <button type="submit" className="relative w-[250px]" disabled={loading}>
            <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
            <div className="buttonText">{loading ? <i className="fa fa-spinner fa-spin"></i> : "Pošalji"}</div>
          </button>
        </div>
      </form>

      <div className="flex-1">
        <SvgWithImage image="/images/museum.png" alt="museum" />
      </div>
    </div>
  );
};

const Contact = (props) => (
  <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
    <ContactForm {...props} />
  </Provider>
);

export default Contact;

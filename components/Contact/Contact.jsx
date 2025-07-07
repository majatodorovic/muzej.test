"use client";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, usePathname } from "next/navigation";
import SvgButtonOne from "../svg/Paths/SvgButtonOne";
import SvgWithImage from "../svg/Paths/SvgWithImage";
import SvgInput from "../svg/Paths/SvgInput";
import SvgTextArea from "../svg/Paths/SvgTextArea";

const Contact = ({ defaultMessage }) => {
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textOptions] = useState([
    {
      id: 1,
      buttonText: "Nađen markirani slepi miš",
      messageText: "Nađen markirani slepi miš. ",
    },
    {
      id: 2,
      buttonText: "Nađena markirana ptica",
      messageText: "Nađena markirana ptica. ",
    },
  ]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isContactPage = pathname === "/kontakt";
  const [contactPageOptions] = useState([
    {
      id: 1,
      buttonText: "Prirodnjački muzej",
      value: "contact_page_prirodnjacki_muzej",
    },
    {
      id: 2,
      buttonText: "Galerija Prirodnjačkog muzeja",
      value: "contact_page_galerija_prirodnjackog_muzeja",
    },
  ]);
  const [contactPage, setContactPage] = useState(
    isContactPage
      ? contactPageOptions[0].value
      : "centar_za_markiranje_zivotinja",
  );

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

  const requiredFields = ["customer_name", "email", "message"];

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    page_section: contactPage,
    customer_name: "",
    email: "",
    message: defaultMessage ? defaultMessage : "",
    gcaptcha: token,
  });

  const handleChange = ({ target }) => {
    let err = [];
    err = errors.filter((error) => error !== target.name);
    setErrors(err);
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSetPredefinedText = (text) => {
    setFormData((prev) => ({
      ...prev,
      message: text,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
      setErrors(errors);
    });
    if (errors?.length > 0) {
      setLoading(false);
    } else {
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
          setLoading(false);
          setFormData({
            page_section: contactPage,
            customer_name: "",
            phone: "",
            email: "",
            message: "",
            gcaptcha: token,
          });
        } else {
          toast.error("Došlo je do greške! Pokušajte ponovo.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
        }
      });
    }
  };

  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} />
      <div className="flex items-center gap-10 max-md:flex-col">
        <form className="flex w-full flex-1 flex-col gap-6">
          <div className="w-1/2 text-lg font-light max-lg:w-full">
            Ako pronađete pticu ili slepog miša sa prstenom javite se
            nacionalnom Centru za markiranje životinja u Prirodnjačkom muzeju.
          </div>
          <div className="relative">
            <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
            <input
              required
              type="text"
              value={formData.customer_name}
              name="customer_name"
              id="customer_name"
              onChange={handleChange}
              placeholder="Ime i prezime"
              className="mainInput2"
            />
          </div>
          {isContactPage && (
            <div className="relative">
              <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
              <input
                required
                type="text"
                value={formData.phone}
                name="phone"
                id="phone"
                placeholder="Telefon"
                onChange={handleChange}
                className="mainInput2 w-full 2xl:w-2/3"
              />
            </div>
          )}
          <div className="relative">
            <SvgInput className="w-full 2xl:w-2/3" fill="#fff" />
            <input
              required
              type="email"
              value={formData.email}
              name="email"
              id="email"
              placeholder="Adresa e-pošte"
              onChange={handleChange}
              className="mainInput2 w-full 2xl:w-2/3"
            />
          </div>
          <div className="relative">
            <SvgTextArea className="w-full 2xl:w-2/3" fill="#fff" />
            <textarea
              required
              name="message"
              id="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Poruka"
              className="mainInput2 w-full py-10 2xl:w-2/3"
            ></textarea>
          </div>

          {isContactPage ? (
            <div className="flex flex-col gap-4">
              {contactPageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setContactPage(option.value)}
                  type="button"
                  className="relative w-[320px] transition-all hover:opacity-80"
                >
                  <SvgButtonOne
                    className="mx-auto h-[52px] w-[320px]"
                    fill={`${contactPage === option.value ? "#224e35" : "transparent"}`}
                  />
                  <div
                    className={`buttonText w-[320px] ${
                      contactPage === option.value ? "" : "!text-primary"
                    }`}
                  >
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
                  onClick={() =>
                    handleSetPredefinedText(
                      option.messageText,
                      option.buttonText,
                    )
                  }
                  type="button"
                  className="relative w-[300px] transition-all hover:opacity-80"
                >
                  <SvgButtonOne
                    className="mx-auto h-[52px] w-[300px]"
                    fill="transparent"
                  />
                  <div className="buttonText w-[300px] !text-primary">
                    {option.buttonText}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex w-full 2xl:w-2/3">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="relative w-[250px]"
              disabled={loading}
            >
              <SvgButtonOne className="mx-auto h-[52px] w-[250px]" />
              <div className="buttonText">
                {loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Pošalji"
                )}
              </div>
            </button>
          </div>
        </form>
        <div className="flex-1">
          <SvgWithImage image="/images/museum.png" alt="museum" />
        </div>
      </div>
    </Provider>
  );
};

export default Contact;

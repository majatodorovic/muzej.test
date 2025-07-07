"use client";
import React, { useState } from "react";
import { post } from "@/api/api";
import { toast } from "react-toastify";
import SvgInput from "@/components/svg/Paths/SvgInput";
import SvgButtonFour from "@/components/svg/Paths/SvgButtonFour";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      toast.error("Mejl nije validan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      await post("/newsletter", { email: email }).then((response) => {
        if (response?.code !== 200) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setEmail("");
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  return (
    <div
      data-aos="fade-up"
      className="sectionPaddingX sectionPaddingY flex flex-col items-center justify-center"
    >
      <h2 className="fontSpectral titleH2 !leading-tight">
        Ne propustite Događaje <br /> Prirodnjačkog Muzeja
      </h2>
      <div className="mb-10 mt-4 max-w-[700px] text-center xl:text-lg">
        Budite uvek u toku sa najnovijim dešavanjima u Prirodnjačkom muzeju!
        Pretplatite se na naš{" "}
        <span className="notranslate font-medium">newsletter</span> i prvi
        saznajte o predstojećim izložbama, novim zbirkama, specijalnim
        događajima i ekskluzivnim sadržajima.
      </div>
      <form
        className="relative flex w-full max-w-[600px] flex-col justify-center gap-2 2xl:max-w-[800px]"
        onSubmit={onSubmit}
      >
        <div className="relative">
          <SvgInput />
          <input
            placeholder="Unesite svoj email"
            title="Unesite validan email"
            type="text"
            id="email"
            name="email"
            onChange={changeHandler}
            value={email}
            className="mainInput2 sm:!pr-[240px]"
          />
        </div>
        <button className="absolute right-4 max-sm:hidden" type="submit">
          <SvgButtonFour className="mx-auto h-[62px] w-[220px]" />
          <div className="buttonText w-[200px]">Prijavite se</div>
        </button>
        <button className="relative mx-auto mt-4 sm:hidden" type="submit">
          <SvgButtonFour className="mx-auto h-[62px] w-[220px]" />
          <div className="buttonText w-[200px]">Prijavite se</div>
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;

"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import SvgButtonTwo from "../svg/Paths/SvgButtonTwo";
import Image from "next/image";

const Translate = () => {
  const baseLanguage = "/auto/sr-Latn";
  const languages = [
    {
      label: "SR",
      value: "/auto/sr-Latn",
      flag: "/icons/srb.png",
    },
    {
      label: "EN",
      value: "/auto/en",
      flag: "/icons/eng.jpg",
    },
  ];
  const [selected, setSelected] = useState(baseLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [isCyrillic, setIsCyrillic] = useState(false);
  const pathname = usePathname();

  const latinToCyrillicMap = {
    NJ: "Њ",
    LJ: "Љ",
    DŽ: "Џ",
    Nj: "Њ",
    Lj: "Љ",
    Dž: "Џ",
    nj: "њ",
    lj: "љ",
    dž: "џ",
    A: "А",
    B: "Б",
    V: "В",
    G: "Г",
    D: "Д",
    Đ: "Ђ",
    E: "Е",
    Ž: "Ж",
    Z: "З",
    I: "И",
    J: "Ј",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    R: "Р",
    S: "С",
    T: "Т",
    Ć: "Ћ",
    U: "У",
    F: "Ф",
    H: "Х",
    C: "Ц",
    Č: "Ч",
    Š: "Ш",
    a: "а",
    b: "б",
    v: "в",
    g: "г",
    d: "д",
    đ: "ђ",
    e: "е",
    ž: "ж",
    z: "з",
    i: "и",
    j: "ј",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    ć: "ћ",
    u: "у",
    f: "ф",
    h: "х",
    c: "ц",
    č: "ч",
    š: "ш",
  };

  const cyrillicToLatinMap = {
    Њ: "Nj",
    Љ: "Lj",
    Џ: "Dž",
    њ: "nj",
    љ: "lj",
    џ: "dž",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Ђ: "Đ",
    Е: "E",
    Ж: "Ž",
    З: "Z",
    И: "I",
    Ј: "J",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    Ћ: "Ć",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Č",
    Ш: "Š",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    ђ: "đ",
    е: "e",
    ж: "ž",
    з: "z",
    и: "i",
    ј: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    ћ: "ć",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "č",
    ш: "š",
  };

  const transliterateToCyrillic = (text) => {
    text = text.replace(
      /NJ|LJ|DŽ|Nj|Lj|Dž|nj|lj|dž/g,
      (match) => latinToCyrillicMap[match] || match,
    );

    return text.replace(/./g, (char) => latinToCyrillicMap[char] || char);
  };

  const transliterateToLatin = (text) => {
    text = text.replace(
      /Њ|Љ|Џ|њ|љ|џ/g,
      (match) => cyrillicToLatinMap[match] || match,
    );

    return text.replace(/./g, (char) => cyrillicToLatinMap[char] || char);
  };

  const convertPageToCyrillic = () => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (
        node.parentElement &&
        !node.parentElement.closest("script, style, textarea, .notranslate")
      ) {
        node.textContent = transliterateToCyrillic(node.textContent || "");
      }
    }

    // Handle input placeholders
    const inputs = document.querySelectorAll(
      "input[placeholder], textarea[placeholder]",
    );
    inputs.forEach((input) => {
      if (!input.closest(".notranslate")) {
        const placeholder = input.getAttribute("placeholder");
        if (placeholder) {
          input.setAttribute(
            "placeholder",
            transliterateToCyrillic(placeholder),
          );
        }
      }
    });
  };

  const convertPageToLatin = () => {
    // Handle text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (
        node.parentElement &&
        !node.parentElement.closest("script, style, textarea, .notranslate")
      ) {
        node.textContent = transliterateToLatin(node.textContent || "");
      }
    }

    // Handle input placeholders
    const inputs = document.querySelectorAll(
      "input[placeholder], textarea[placeholder]",
    );
    inputs.forEach((input) => {
      if (!input.closest(".notranslate")) {
        const placeholder = input.getAttribute("placeholder");
        if (placeholder) {
          input.setAttribute("placeholder", transliterateToLatin(placeholder));
        }
      }
    });
  };

  useEffect(() => {
    // Get the language from cookie
    const cookieLang = getCookie("googtrans");

    // If there's no cookie or it's invalid, set it to base language
    if (!cookieLang || !languages.some((lang) => lang.value === cookieLang)) {
      setCookie("googtrans", baseLanguage, { path: "/" });
      setSelected(baseLanguage);
    } else {
      setSelected(cookieLang);
    }

    // Get cyrillic preference from localStorage
    const cyrillicStorage = localStorage.getItem("isCyrillic");
    setIsCyrillic(cyrillicStorage === "true");

    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "auto",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element",
      );
      const translateBar = document.querySelector(".skiptranslate");
      if (translateBar) {
        translateBar.style.display = "none";
        translateBar.style.visibility = "hidden";
        translateBar.style.height = "0px";
        translateBar.style.width = "0px";
        translateBar.style.overflow = "hidden";
        translateBar.style.position = "absolute";
        translateBar.style.left = "-9999px";
        translateBar.style.top = "-9999px";
      }
    };

    if (!window.google || !window.google.translate) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      googleTranslateElementInit();
    }
  }, []);

  useEffect(() => {
    if (isCyrillic) {
      convertPageToCyrillic();

      // Set up mutation observer to handle dynamic content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            convertPageToCyrillic();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    } else {
      convertPageToLatin();

      // Set up mutation observer to handle dynamic content
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            convertPageToLatin();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [isCyrillic, pathname]);

  // Google translate cookie + state
  const langChange = (value) => {
    if (value === baseLanguage) {
      setCookie("googtrans", value, { path: "/" }); // Set the cookie with the correct value
      setSelected(value);
      setIsCyrillic(false);
      localStorage.setItem("isCyrillic", "false");
      window.location.reload();
    } else if (value === "/auto/en") {
      setCookie("googtrans", value, { path: "/" });
      setSelected(value);
      setIsCyrillic(false);
      localStorage.setItem("isCyrillic", "false");
      window.location.reload();
    }
  };

  const handleCyrillicClick = () => {
    setIsCyrillic(true);
    localStorage.setItem("isCyrillic", "true");
    // Force immediate translation
    convertPageToCyrillic();
  };

  const handleLatinClick = () => {
    setIsCyrillic(false);
    localStorage.setItem("isCyrillic", "false");
    // Force immediate translation
    convertPageToLatin();
  };

  // Add a new effect to handle initial load and navigation
  useEffect(() => {
    // Get cyrillic preference from localStorage on every navigation
    const cyrillicStorage = localStorage.getItem("isCyrillic");
    if (cyrillicStorage === "true") {
      setIsCyrillic(true);
      convertPageToCyrillic();
    } else {
      setIsCyrillic(false);
      convertPageToLatin();
    }
  }, [pathname]); // Re-run when pathname changes

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          position: "absolute",
          left: "50%",
          zIndex: -99999,
        }}
      ></div>

      <div className="flex items-center max-xl:mr-auto max-xl:flex-row-reverse">
        {selected !== "/auto/en" && (
          <div className="flex gap-2">
            <div className="relative max-xl:-ml-9">
              <SvgButtonTwo className="mx-auto h-[62px] w-[200px]" />
              <div className="buttonText flex gap-2 !text-xl !font-normal">
                <span
                  onClick={handleCyrillicClick}
                  className={`${isCyrillic ? "text-[#C1E35A]" : "text-[#B3C1AC]"} cursor-pointer`}
                >
                  Ćir
                </span>
                <span className="text-[#B3C1AC]">|</span>
                <span
                  onClick={handleLatinClick}
                  className={`${isCyrillic ? "text-[#B3C1AC]" : "text-[#C1E35A]"} cursor-pointer`}
                >
                  Lat
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2 border-0 bg-transparent text-gray-400 max-lg:min-w-[120px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src={
                languages.find((lang) => lang.value === selected)?.flag ||
                languages[0].flag
              }
              alt="flag"
              width={40}
              height={40}
              className="min-h-[40px] min-w-[40px] rounded-full border border-primary object-cover"
            />
            <span className="notranslate ml-2 text-xl text-[#B3C1AC]">
              {languages.find((lang) => lang.value === selected)?.label}
            </span>
          </div>

          {isOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[120px] overflow-hidden rounded-lg bg-primary shadow-lg">
              {languages.map((language) => (
                <div
                  key={language.value}
                  className="flex min-w-[120px] cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-700"
                  onClick={() => {
                    langChange(language.value);
                    setIsOpen(false);
                  }}
                >
                  <Image
                    src={language.flag}
                    alt={language.label}
                    width={20}
                    height={20}
                  />
                  <span className="notranslate text-white">
                    {language.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Translate;

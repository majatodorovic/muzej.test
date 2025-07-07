"use client";

import { useEffect } from "react";
import { icons } from "@/_lib/icons";
import { Form } from "@/_components/shared/form";

export const Modal = ({
  show,
  handleOpen,
  errors,
  data,
  setData,
  handleSubmit,
  handleInputChange,
  fields,
  isPending,
  className,
  button_text,
  title,
  description,
  type = "form",
  children,
}) => {
  // Zabrani scrollovanje body-ja kada je modal otvoren
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  switch (type) {
    case "form":
      return (
        <>
          <div
            className={
              show
                ? `fixed bottom-0 left-0 right-0 top-0 z-[2002] m-auto max-h-[70%] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 max-sm:w-[95%]`
                : `hidden`
            }
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl">{title}</h3>
              <span
                className="w-[1.5rem] cursor-pointer hover:text-red-500"
                onClick={handleOpen}
              >
                {icons.close}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
            <Form
              className={className}
              errors={errors}
              data={data}
              showOptions={false}
              setData={setData}
              handleSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              fields={fields}
              handleInputChange={(e) => {
                handleInputChange(e);
              }}
              isPending={isPending}
              button_text={button_text}
            />
          </div>
          <div
            onClick={handleOpen}
            className={
              show
                ? `fixed left-0 top-0 z-[2001] h-[100dvh] w-[100dvw] bg-black/70`
                : ``
            }
          />
        </>
      );

    default:
      return (
        <>
          <div
            className={
              show
                ? `fixed bottom-0 left-0 right-0 top-0 z-[2002] m-auto max-h-[70%] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 max-sm:w-[95%]`
                : `hidden`
            }
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl">{title}</h3>
              <span
                className="w-[1.5rem] min-w-[1.5rem] cursor-pointer hover:text-red-500"
                onClick={handleOpen}
              >
                {icons.close}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
            {children}
          </div>
          <div
            onClick={handleOpen}
            className={
              show
                ? `fixed left-0 top-0 z-[2001] h-[100dvh] w-[100dvw] bg-black/70`
                : ``
            }
          />
        </>
      );
  }
};

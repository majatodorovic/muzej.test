import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

export const TemplateOne = ({ verifyCaptcha, children }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <div className="sectionPaddingX sectionPaddingB">
        <div className="max-xl:row-start-1">{children}</div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

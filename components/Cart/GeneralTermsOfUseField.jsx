const GeneralTermsOfUseField = ({
  dataTmp,
  setDataTmp,
  errorsTmp,
  setErrorsTmp,
}) => {
  return (
    <div className={`mt-3 flex flex-col px-5`}>
      <div className="relative flex items-center gap-3">
        <div
          className={`h-1 w-5 rounded-sm ${
            dataTmp?.accept_rules ? "bg-primary" : "bg-primary/50"
          }`}
        ></div>
        <input
          type="checkbox"
          id="accept_rules"
          name="accept_rules"
          onChange={(e) => {
            setDataTmp({
              ...dataTmp,
              accept_rules: e?.target?.checked,
            });
            setErrorsTmp(
              errorsTmp?.filter((error) => error !== "accept_rules"),
            );
          }}
          checked={dataTmp?.accept_rules}
          className="hidden"
        />
        <label
          htmlFor="accept_rules"
          className={`cursor-pointer text-base ${
            dataTmp?.accept_rules ? "text-primary" : "text-gray-400"
          }`}
        >
          Saglasan sam sa{" "}
          <a
            href={`/strana/uslovi-koriscenja`}
            target={`_blank`}
            className="underline"
          >
            <span>opštim uslovima korišćenja</span>
          </a>
        </label>
      </div>
      {errorsTmp?.includes("accept_rules") && (
        <p className={`mt-2 text-[0.75rem] text-red-500`}>
          Molimo Vas da prihvatite uslove korišćenja.
        </p>
      )}
    </div>
  );
};

export default GeneralTermsOfUseField;

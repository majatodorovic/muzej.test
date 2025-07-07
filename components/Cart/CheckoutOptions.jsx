import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch as FETCH } from "@/api/api";
import { Form, createOptionsArray } from "@/_components/form";

const CheckoutOptions = ({
  formData,
  setFormData,
  payment_options,
  delivery_options,
  errors,
  setErrors,
}) => {
  const queryClient = useQueryClient();
  const { data: delivery_form } = useQuery({
    queryKey: [
      "delivery-option-form",
      {
        delivery_method: formData?.delivery_method,
      },
    ],
    queryFn: async () => {
      return await FETCH(
        `checkout/delivery-option-form/${formData?.delivery_method}`,
        {
          order_data: {},
        },
      ).then((res) => res?.payload);
    },
  });

  const onChange = ({ value, prop_name, selected }) => {
    let data = {};
    if (value) {
      let method_id = formData?.delivery_method;
      let method_name = (delivery_options ?? [])?.find(
        (o) => o?.id === formData?.delivery_method,
      )?.name;

      data = {
        delivery_method_id: method_id,
        delivery_method_name: method_name,
        prop_name,
        selected,
      };

      const arr = createOptionsArray(data);
      setErrors(errors?.filter((error) => error !== "delivery_method_options"));
      setFormData({
        ...formData,
        delivery_method_options: arr,
      });
      queryClient.fetchQuery({
        queryKey: ["summary", formData],
        queryFn: async () => {
          return await FETCH(`checkout/summary`, {
            ...formData,
            delivery_method_options: arr,
          }).then((res) => res?.payload);
        },
      });
    }
  };

  return (
    <>
      <div className={`col-span-2 lg:col-span-1`}>
        <div className={`flex flex-col gap-8`}>
          <div className="flex w-full flex-col">
            <h2 className="text-xl">Način dostave</h2>
            {/* <div
              className={`mainInputWrapper !p-1 ${errors?.includes("delivery_method") && "!bg-red-500"}`}
            > */}
            {/* <div className="mainInput w-full !bg-white !px-10 !py-14"> */}
            <div className="w-full p-5">
              <div className={`flex flex-col gap-1`}>
                {(delivery_options ?? [])?.map(({ id, name }) => {
                  return (
                    <div className={`flex flex-col gap-2`} key={id}>
                      <div className={`flex items-center gap-3`} key={id}>
                        <div
                          className={`h-1 w-5 rounded-sm ${
                            formData.delivery_method === id
                              ? "bg-primary"
                              : "bg-primary/50"
                          }`}
                        ></div>
                        <input
                          type={`radio`}
                          className={`hidden`}
                          name={`delivery_method`}
                          id={`delivery_method_${id}`}
                          value={id}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              delivery_method: e.target.value,
                              delivery_method_options: [],
                            });
                            setErrors(
                              errors?.filter(
                                (error) => error !== "delivery_method",
                              ),
                            );
                            // refreshSummary();
                            queryClient.fetchQuery({
                              queryKey: ["summary"],
                              queryFn: async () => {
                                return await FETCH(`checkout/summary`, {
                                  ...formData,
                                  delivery_method: e.target.value,
                                  delivery_method_options: [],
                                }).then((res) => res?.payload);
                              },
                            });
                          }}
                        />
                        <label
                          htmlFor={`delivery_method_${id}`}
                          className={`cursor-pointer text-base ${
                            formData.delivery_method === id
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        >
                          {name}
                        </label>
                      </div>
                      {formData?.delivery_method === id &&
                        delivery_form?.status &&
                        delivery_form?.fields?.length > 0 && (
                          <Form
                            errors={errors}
                            fields={delivery_form?.fields}
                            onChange={onChange}
                          />
                        )}
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
            {errors?.includes("delivery_method") && (
              <div className={`text-xs text-red-500`}>
                Ovo polje je obavezno.
              </div>
            )}
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-xl">Način plaćanja</h2>
            {/* <div
              className={`mainInputWrapper !p-1 ${errors?.includes("payment_method") && "!bg-red-500"}`}
            >
              <div className="mainInput w-full !bg-white !px-10 !py-14"> */}
            <div className="w-full p-5">
              <div className={`flex flex-col gap-1`}>
                {(payment_options ?? [])?.map(({ id, name }) => {
                  return (
                    <div
                      className={`flex items-center gap-3 px-2 py-1`}
                      key={id}
                    >
                      <div
                        className={`h-1 w-5 rounded-sm ${
                          formData.payment_method === id
                            ? "bg-primary"
                            : "bg-primary/50"
                        }`}
                      ></div>
                      <input
                        type="radio"
                        className="hidden"
                        name="payment_method"
                        id={`payment_method_${id}`}
                        value={id}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            payment_method: e.target.value,
                          });
                          setErrors(
                            errors?.filter(
                              (error) => error !== "payment_method",
                            ),
                          );
                        }}
                        checked={formData.payment_method === id}
                      />
                      <label
                        htmlFor={`payment_method_${id}`}
                        className={`cursor-pointer text-base ${
                          formData.payment_method === id
                            ? "text-primary"
                            : "text-gray-400"
                        }`}
                      >
                        {name}
                      </label>
                    </div>
                  );
                })}
              </div>
              {/* </div> */}
            </div>
            {errors?.includes("payment_method") && (
              <div className={`text-xs text-red-500`}>
                Ovo polje je obavezno.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOptions;

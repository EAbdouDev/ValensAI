"use client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { caseSteps } from "@/lib/CaseSteps";
import { stepSchemas } from "@/lib/schema";
import { faker } from "@faker-js/faker";

interface CustomCaseFormProps {}

const CustomCaseForm: FC<CustomCaseFormProps> = ({}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(stepSchemas[currentStep]),
    mode: "onBlur",
  });

  const onNext = (data: any) => {
    if (currentStep < caseSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Form submitted:", data);
      // Handle form submission
    }
  };

  const onBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const gender = watch("gender");

  const handleGenerateName = () => {
    let firstName, lastName;
    if (gender === "male") {
      firstName = faker.person.firstName("male");
      lastName = faker.person.lastName("male");
    } else if (gender === "female") {
      firstName = faker.person.firstName("female");
      lastName = faker.person.lastName("male");
    } else {
      firstName = faker.person.firstName();
      lastName = faker.person.lastName();
    }
    setValue("patient_name", `${firstName} ${lastName}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onNext)}
        className="space-y-4 p-6 max-w-7xl mx-auto "
      >
        <div className="flex justify-between gap-4 mb-10  rounded-lg px-4 py-2">
          <div className="flex justify-center items-center">
            {" "}
            <h1 className="text-xl font-bold ">
              {caseSteps[currentStep].title}
            </h1>
          </div>
          <div className="flex justify-end items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {currentStep < caseSteps.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
        <div key={caseSteps[currentStep].id} className=" my-8 px-4">
          <div className="space-y-6">
            {caseSteps[currentStep].fields.map((field) => (
              <div
                key={field.name}
                className="flex flex-col justify-start items-start gap-2 w-full mb-4"
              >
                <div className="flex justify-between items-center w-full ">
                  <label className="font-medium">{field.label}</label>
                  {field.option ? (
                    <button
                      className="underline opacity-80 hover:opacity-100 transition-all ease-in-out"
                      onClick={() => {
                        if (field.option?.type === "generate_name") {
                          handleGenerateName(field.name);
                        }
                      }}
                    >
                      {field.option?.type === "generate_name"
                        ? "Generate Name"
                        : ""}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {field.type === "input" ? (
                  <input
                    {...register(field.name)}
                    placeholder={`${field.placeHolder}`}
                    className="w-full p-2 border rounded-lg "
                  />
                ) : (
                  <textarea
                    {...register(field.name)}
                    placeholder={`${field.placeHolder}`}
                    rows={5}
                    className="w-full p-2 border rounded"
                  />
                )}
                {errors[field.name] && (
                  <span className="text-red-500">
                    {errors[field.name]?.message as string}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomCaseForm;

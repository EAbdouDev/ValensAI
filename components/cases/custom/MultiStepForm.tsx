"use client";
import { FC, useState } from "react";
import BasicPatientInfo1 from "./BasicPatientInfo1";
import MedicalHistory2 from "./MedicalHistory2";
import PresentingComplaint3 from "./PresentingComplaint3";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  BasicDetailsSchema,
  ComplaintSchema,
  DiagnosisSchema,
  DiagnosticTestsSchema,
  MedicalHistorySchema,
  PhysicalExamSchema,
  ReviewOfSystemsSchema,
} from "@/lib/schema";

export const inputGroupStye = "flex flex-col justify-start items-start gap-2";
export const inputStyle = "p-2 border-2 rounded-lg w-full";
export const labelStyle = "font-medium";

// const steps = [
//   { id: 1, title: "Basic Patient Information", completed: false, schema:BasicDetailsSchema  },
//   { id: 2, title: "Document Medical History", completed: false, schema:  MedicalHistorySchema},
//   { id: 3, title: "Presenting Complaint", completed: false, schema: ComplaintSchema },
//   { id: 4, title: "Review of Systems", completed: false, schema: ReviewOfSystemsSchema },
//   { id: 5, title: "Physical Examination Findings", completed: false, schema: PhysicalExamSchema },
//   { id: 6, title: "Diagnostic Tests", completed: false, schema: DiagnosticTestsSchema },
//   { id: 7, title: "Differential Diagnosis", completed: false, schema: DiagnosisSchema },
//   { id: 8, title: "Final Diagnosis", completed: false, schema:TreatmentSchema },
//   { id: 9, title: "Treatment Plan", completed: false, schema: },
//   { id: 10, title: "Additional Notes", completed: false, schema: },
//   { id: 11, title: "Feedback Criteria", completed: false, schema: },
//   { id: 12, title: "Review and Submit", completed: false, schema: },
// ];

interface MultiStepFormProps {}

const MultiStepForm: FC<MultiStepFormProps> = ({}) => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const nextStep = (data: any) => {
    // setFormData({ ...formData, ...data });
    // steps[currentStep].completed = true;
    // setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (data: any) => {
    nextStep(data);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicPatientInfo1 onSubmit={handleSubmit} />;
      case 1:
        return <MedicalHistory2 onSubmit={handleSubmit} />;
      // case 2:
      //   return <PresentingComplaint3 onSubmit={handleSubmit} />;
      // add cases for other steps
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="flex  ">
      {/* <Sidebar steps={steps} /> */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-grow">{renderStep()}</div>
        <div className="flex justify-end items-center gap-6 mt-20">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2  rounded disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            type="submit"
            form="current-form"
            onClick={nextStep}
            className="px-6 py-2 dark:bg-white dark:text-black bg-black text-white rounded flex justify-center items-center gap-2"
          >
            {/* {currentStep === steps.length - 1 ? "Submit" : "Next"}
            {currentStep === steps.length - 1 ? (
              ""
            ) : (
              <ArrowRight className="w-5 h-5" />
            )} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;

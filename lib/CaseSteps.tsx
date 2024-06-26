import {
  Annoyed,
  Bone,
  BookOpenCheck,
  PillBottle,
  ScanEye,
  SquareUser,
  Stethoscope,
  TestTubeDiagonal,
} from "lucide-react";

export const caseSteps = [
  {
    id: "patient_info",
    title: "Basic Patient Informations",
    icon: <SquareUser />,
    fields: [
      {
        name: "patient_name",
        type: "input",
        label: "Name",
        placeHolder: "Enter the patient name, or generate one...",
        option: {
          label: "Generate a name",
          type: "generate_name",
        },
      },
      {
        name: "age",
        type: "input",
        label: "Age",
        placeHolder: "Enter the patient age...",
      },
      {
        name: "gender",
        type: "input",
        label: "Gender",
        placeHolder: "Enter the patient gender...",
      },
      {
        name: "occupation",
        type: "input",
        label: "Occupation",
        placeHolder: "Enter the patient occupation...",
      },
      {
        name: "height",
        type: "input",
        label: "Height",
        placeHolder: "Enter the patient height...",
      },
      {
        name: "weight",
        type: "input",
        label: "Weight",
        placeHolder: "Enter the patient weight...",
      },
    ],
  },
  {
    id: "complaint",
    title: "Complaints",
    icon: <Annoyed />,
    fields: [
      {
        name: "chief_complaint",
        type: "textArea",
        label: "Chief Complaints",
        placeHolder: "Enter the patient chief complaints...",
      },
      {
        name: "history_of_presenting_illness",
        type: "textArea",
        label: "History of preswnting illness",
        placeHolder: "Enter the patient history of preswnting illness...",
      },
    ],
  },
  {
    id: "review_of_systems",
    title: "Review Of Systems",
    icon: <ScanEye />,
    fields: [
      {
        name: "general",
        type: "textArea",
        label: "General Examination Findings",
        placeHolder: "Enter the general examination findings...",
      },
      {
        name: "endocrine",
        type: "textArea",
        label: "Endocrine Examination Findings",
        placeHolder: "Enter the endocrine examination findings...",
      },
      {
        name: "psychiatric",
        type: "textArea",
        label: "Psychiatric Examination Findings",
        placeHolder: "Enter the psychiatric examination findings...",
      },
      {
        name: "respiratory",
        type: "textArea",
        label: "Respiratory Examination Findings",
        placeHolder: "Enter the respiratory examination findings...",
      },
      {
        name: "neurological",
        type: "textArea",
        label: "Neurological Examination Findings",
        placeHolder: "Enter the neurological examination findings...",
      },
      {
        name: "genitourinary",
        type: "textArea",
        label: "Genitourinary Examination Findings",
        placeHolder: "Enter the genitourinary examination findings...",
      },
      {
        name: "hematological",
        type: "textArea",
        label: "Hematological Examination Findings",
        placeHolder: "Enter the hematological examination findings...",
      },
      {
        name: "cardiovascular",
        type: "textArea",
        label: "Cardiovascular Examination Findings",
        placeHolder: "Enter the cardiovascular examination findings...",
      },
      {
        name: "dermatological",
        type: "textArea",
        label: "Dermatological Examination Findings",
        placeHolder: "Enter the dermatological examination findings...",
      },
      {
        name: "musculoskeletal",
        type: "textArea",
        label: "Musculoskeletal Examination Findings",
        placeHolder: "Enter the musculoskeletal examination findings...",
      },
      {
        name: "gastrointestinal",
        type: "textArea",
        label: "Gastrointestinal Examination Findings",
        placeHolder: "Enter the Gastrointestinal examination findings...",
      },
    ],
  },
  {
    id: "vital_signs",
    title: "Vital Signs",
    icon: <Bone />,
    fields: [
      {
        name: "heart_rate",
        type: "input",
        label: "heart Rate",
        placeHolder: "Enter the patient heart Rate...",
      },
      {
        name: "temperature",
        type: "input",
        label: "Temperature",
        placeHolder: "Enter the patient temperature...",
      },
      {
        name: "blood_pressure",
        type: "input",
        label: "Blood Pressure",
        placeHolder: "Enter the patient blood pressure...",
      },
      {
        name: "respiratory_rate",
        type: "input",
        label: "Respiratory Rate",
        placeHolder: "Enter the patient respiratory rate...",
      },

      {
        name: "media",
        type: "file",
      },
    ],
  },
  {
    id: "diagnostic_tests",
    title: "Diagnostic Tests",
    icon: <TestTubeDiagonal />,
    fields: [
      {
        name: "lab_results",
        type: "textArea",
        label: "Lab Results",
        placeHolder: "Enter the lab results...",
      },
      {
        name: "imaging_studies_results",
        type: "textArea",
        label: "Imaging Studies Results",
        placeHolder: "Enter the imaging studies results...",
      },
      {
        name: "other_tests_results",
        type: "textArea",
        label: "Other tests results",
        placeHolder: "Enter the other tests results...",
      },
      {
        name: "media",
        type: "file",
      },
    ],
  },
  {
    id: "diagnosis",
    title: "Diagnosis",
    icon: <Stethoscope />,
    fields: [
      {
        name: "possible_diagnoses",
        type: "textArea",
      },
      {
        name: "final_diagnosis",
        type: "textArea",
      },
    ],
  },
  {
    id: "treatment",
    title: "Treatment",
    icon: <PillBottle />,
    fields: [
      {
        name: "medications",
        type: "textArea",
      },
      {
        name: "non_pharmacological_interventions",
        type: "textArea",
      },
      {
        name: "follow_up_plan",
        type: "textArea",
      },
      {
        name: "media",
        type: "file",
      },
    ],
  },
  {
    id: "feedback_cretria",
    title: "Feedback Cretria",
    icon: <BookOpenCheck />,
    fields: [
      {
        name: "communication_skills_cretria",
        type: "textArea",
      },
      {
        name: "dignosis_cretria",
        type: "textArea",
      },
      {
        name: "patient_clinical_report_cretria",
        type: "textArea",
      },
      {
        name: "media",
        type: "file",
      },
    ],
  },
];

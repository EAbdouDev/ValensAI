"use client";

import useNewCase from "@/zuztand/NewCase";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";

interface pageProps {
  params: {
    id: string;
  };
}

const CommunicationNewAIPage: FC<pageProps> = ({ params }) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const { name } = useNewCase();
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const supabase = createClient();
  const { user } = useUser();

  useEffect(() => {
    if (name === "") {
      router.back();
    }

    if (name !== "") {
      generateCase(name);
    }
  }, [name]);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Generate a comprehensive medical case about a patient with [Disease Name]. Use the following format and structure for the JSON output. Include realistic and detailed information for each section. The patient’s gender, age, occupation, weight, and height should be random and appropriate for the disease. If there are no findings in the review of systems for any system, use "N/A". The medications should always be returned as an array, even if empty. The temperature should be provided in both Fahrenheit and Celsius. If the disease name is invalid or if the input is anything other than a disease name, return {"error":""}. Always return the JSON in the specified format and do not answer anything else.\n\n{\n  "patientDetails": {\n    "name": "[Random Name]",\n    "age": "[Random Age]",\n    "gender": "[Random Gender]",\n    "occupation": "[Random Occupation]",\n    "weight": "[Random Weight in kg, same in lb]",\n    "height": "[Random Height in cm, same in inches]"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Hypertension, Type 2 Diabetes",\n    "familyMedicalHistory": "Mother had osteoarthritis, Father had hypertension",\n    "surgicalHistory": "Appendectomy at age 30",\n    "medications": ["Metformin 500mg BID", "Lisinopril 10mg daily"],\n    "allergies": "None",\n    "socialHistory": "Non-smoker, occasional alcohol use"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Joint pain and stiffness",\n    "historyOfPresentingIllness": "The patient reports gradual onset of joint pain and stiffness in the knees and hands over the past 6 months. Symptoms are worse in the morning and improve with movement. There is occasional swelling in the affected joints."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue, weight gain",\n    "musculoskeletal": "Joint pain, stiffness, swelling in knees and hands",\n    "cardiovascular": "No chest pain, palpitations",\n    "respiratory": "No shortness of breath, cough",\n    "gastrointestinal": "No abdominal pain, changes in bowel habits",\n    "neurological": "N/A",\n    "genitourinary": "N/A",\n    "endocrine": "N/A",\n    "dermatological": "N/A",\n    "psychiatric": "N/A",\n    "hematological": "N/A"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": {\n        "fahrenheit": "98.6°F",\n        "celsius": "37°C"\n      },\n      "bloodPressure": "130/85 mmHg",\n      "heartRate": "72 bpm",\n      "respiratoryRate": "16 breaths per minute"\n    },\n    "generalExamination": "Overweight, no acute distress",\n    "systemSpecificExaminationFindings": {\n      "musculoskeletal": "Tenderness and swelling in bilateral knees and hands, decreased range of motion in affected joints"\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "CBC": "Within normal limits",\n      "ESR": "Elevated at 30 mm/hr",\n      "CRP": "Elevated at 15 mg/L"\n    },\n    "imagingStudies": {\n      "xray": "X-ray of knees shows joint space narrowing and osteophyte formation"\n    }\n  },\n  "differentialDiagnosis": [\n    "Osteoarthritis",\n    "Rheumatoid arthritis",\n    "Gout"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Osteoarthritis"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Ibuprofen",\n        "dosage": "400mg",\n        "frequency": "TID as needed for pain"\n      },\n      {\n        "name": "Glucosamine",\n        "dosage": "500mg",\n        "frequency": "BID"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Physical therapy",\n      "Weight loss program",\n      "Low-impact exercise regimen"\n    ],\n    "followUpPlan": "Follow-up in 6 weeks for reassessment and possible adjustment of treatment plan"\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on the importance of weight management and regular exercise"\n  }\n}\n\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "patientDetails": {\n    "name": "Emily Carter",\n    "age": "62",\n    "gender": "Female",\n    "occupation": "Retired teacher",\n    "weight": "85 kg",\n    "height": "165 cm"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Hypertension, Type 2 Diabetes",\n    "familyMedicalHistory": "Mother had osteoarthritis, Father had hypertension",\n    "surgicalHistory": "Appendectomy at age 30",\n    "medications": ["Metformin 500mg BID", "Lisinopril 10mg daily"],\n    "allergies": "None",\n    "socialHistory": "Non-smoker, occasional alcohol use"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Joint pain and stiffness",\n    "historyOfPresentingIllness": "The patient reports gradual onset of joint pain and stiffness in the knees and hands over the past 6 months. Symptoms are worse in the morning and improve with movement. There is occasional swelling in the affected joints."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue, weight gain",\n    "musculoskeletal": "Joint pain, stiffness, swelling in knees and hands",\n    "cardiovascular": "No chest pain, palpitations",\n    "respiratory": "No shortness of breath, cough",\n    "gastrointestinal": "No abdominal pain, changes in bowel habits",\n    "neurological": "N/A",\n    "genitourinary": "N/A",\n    "endocrine": "N/A",\n    "dermatological": "N/A",\n    "psychiatric": "N/A",\n    "hematological": "N/A"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": {\n        "fahrenheit": "98.6°F",\n        "celsius": "37°C"\n      },\n      "bloodPressure": "130/85 mmHg",\n      "heartRate": "72 bpm",\n      "respiratoryRate": "16 breaths per minute"\n    },\n    "generalExamination": "Overweight, no acute distress",\n    "systemSpecificExaminationFindings": {\n      "musculoskeletal": "Tenderness and swelling in bilateral knees and hands, decreased range of motion in affected joints"\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "CBC": "Within normal limits",\n      "ESR": "Elevated at 30 mm/hr",\n      "CRP": "Elevated at 15 mg/L"\n    },\n    "imagingStudies": {\n      "xray": "X-ray of knees shows joint space narrowing and osteophyte formation"\n    }\n  },\n  "differentialDiagnosis": [\n    "Osteoarthritis",\n    "Rheumatoid arthritis",\n    "Gout"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Osteoarthritis"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Ibuprofen",\n        "dosage": "400mg",\n        "frequency": "TID as needed for pain"\n      },\n      {\n        "name": "Glucosamine",\n        "dosage": "500mg",\n        "frequency": "BID"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Physical therapy",\n      "Weight loss program",\n      "Low-impact exercise regimen"\n    ],\n    "followUpPlan": "Follow-up in 6 weeks for reassessment and possible adjustment of treatment plan"\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on the importance of weight management and regular exercise"\n  }\n}\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "asthma " }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "patientDetails": {\n    "name": "John Smith",\n    "age": "35",\n    "gender": "Male",\n    "occupation": "Software Engineer",\n    "weight": "75 kg",\n    "height": "178 cm"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Seasonal allergies",\n    "familyMedicalHistory": "Mother has asthma, Father has hypertension",\n    "surgicalHistory": "None",\n    "medications": [],\n    "allergies": "Pollen, dust mites",\n    "socialHistory": "Non-smoker, occasional alcohol use"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Wheezing and shortness of breath",\n    "historyOfPresentingIllness": "The patient presents with a 2-day history of wheezing and shortness of breath, especially at night. He reports a history of similar episodes in the past, particularly during the spring and fall. He also notes a dry cough and chest tightness."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue",\n    "respiratory": "Wheezing, shortness of breath, cough, chest tightness",\n    "cardiovascular": "N/A",\n    "musculoskeletal": "N/A",\n    "gastrointestinal": "N/A",\n    "neurological": "N/A",\n    "genitourinary": "N/A",\n    "endocrine": "N/A",\n    "dermatological": "N/A",\n    "psychiatric": "N/A",\n    "hematological": "N/A"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": {\n        "fahrenheit": "98.8°F",\n        "celsius": "37.1°C"\n      },\n      "bloodPressure": "120/80 mmHg",\n      "heartRate": "88 bpm",\n        "respiratoryRate": "20 breaths per minute"\n    },\n    "generalExamination": "No acute distress, slightly tachypneic",\n    "systemSpecificExaminationFindings": {\n      "respiratory": "Wheezes bilaterally on auscultation of the lungs"\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "CBC": "Within normal limits",\n      "sputum culture": "No growth"\n    },\n    "imagingStudies": {\n      "chest x-ray": "No acute findings"\n    }\n  },\n  "differentialDiagnosis": [\n    "Asthma",\n    "Chronic obstructive pulmonary disease (COPD)",\n    "Bronchitis",\n    "Pneumonia"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Asthma"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Albuterol inhaler",\n        "dosage": "2 puffs",\n        "frequency": "As needed for symptoms"\n      },\n      {\n        "name": "Fluticasone inhaler",\n        "dosage": "2 puffs",\n        "frequency": "BID"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Avoidance of triggers (pollen, dust mites)",\n      "Smoking cessation"\n    ],\n    "followUpPlan": "Follow-up in 2 weeks for reassessment and possible adjustment of treatment plan"\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on asthma management, trigger avoidance, and proper inhaler technique"\n  }\n}\n```',
          },
        ],
      },
    ],
  });

  async function generateCase(name: string) {
    setIsLoading(true);
    const result = await chatSession.sendMessage(`${name}`);

    console.table(result);
    if (result) {
      const jsonResponse =
        result.response.candidates?.[0].content.parts[0].text;
      if (jsonResponse) {
        console.table(jsonResponse);
        setCaseDetails(JSON.parse(jsonResponse));
      }
    }
    setIsLoading(false);
  }

  async function regenerateCase() {
    setIsLoading(true);
    const result = await chatSession.sendMessage(
      `regernate a new case about ${name}`
    );

    if (result) {
      const jsonResponse =
        result.response.candidates?.[0].content.parts[0].text;
      if (jsonResponse) {
        console.table(jsonResponse);
        setCaseDetails(JSON.parse(jsonResponse));
      }
    }
    setIsLoading(false);
  }
  async function createCase() {
    setIsCreating(true);
    const { data, error } = await supabase.from("v_cases").insert({
      id: params.id,
      case_title: name,
      created_by: user?.id,
      case_details: caseDetails,
      case_type: "comm",
    });

    if (error) {
      throw error.message;
    }
    setIsCreating(false);
  }

  const sectionDivStyle =
    "dark:bg-[#181818] shadow-lg dark:shadow-none p-4 rounded-xl  space-y-6";
  const sectionHeadingStyle = "text-2xl font-semibold mb-4 border-b pb-2";
  const infoDivStyle = "space-y-2";
  const labelStyle = "text-sm font-bold opacity-60";
  const textStyle = "text-lg font-medium";

  return (
    <div className="w-full h-full p-4  max-w-7xl mx-auto 2xl:my-10 my-4 pb-20 ">
      <header className="flex justify-between items-center gap-x-4">
        <div>
          <p className="text-sm opacity-50 mb-2">
            Communication Skills Assesment | Generated using Gemini
          </p>
          <h1 className="text-2xl font-bold capitalize">{name}</h1>
        </div>

        <div className="flex justify-end items-center gap-4">
          <button
            className="border px-4 py-2 font-medium rounded-lg"
            onClick={regenerateCase}
          >
            Regenrate using Gemini
          </button>
          <button
            onClick={createCase}
            disabled={isCreating}
            className="disabled:opacity-50 bg-black text-white dark:bg-white dark:text-black px-4 py-2 font-medium rounded-lg"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </header>

      {isloading && (
        <div className="mt-6 flex flex-col w-full h-full justify-center items-center gap-4 flex-grow">
          <Loader className="animate-spin w-8 h-8" />
          <p className="text-xl font-medium">Generating the case...</p>
          <p className="opacity-70 text-sm mt-2">
            This usually takes a minute{" "}
          </p>
        </div>
      )}

      {!isloading && caseDetails && (
        <div className="mt-8 space-y-4">
          <div className={sectionDivStyle}>
            <h1 className={sectionHeadingStyle}>Patient Details</h1>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Name</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? caseDetails.patientDetails.name
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Age</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? `${caseDetails.patientDetails.age} years old`
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Gender</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? caseDetails.patientDetails.gender
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Occupation</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? caseDetails.patientDetails.occupation
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Weight</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? caseDetails.patientDetails.weight
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Height</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.patientDetails
                  ? caseDetails.patientDetails.height
                  : ""}
              </p>
            </div>
          </div>

          {/* medicalHistory */}
          <div className={sectionDivStyle}>
            {" "}
            <h1 className={sectionHeadingStyle}>Medical History</h1>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Past Medical History</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.pastMedicalHistory
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Family Medical History</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.familyMedicalHistory
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Surgical History</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.surgicalHistory
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Medications</label>
              <p className={`${textStyle} flex flex-col space-y-2 space-x-2`}>
                {" "}
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.medications
                  : "N/A"}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Allergies</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.allergies
                  : "N/A"}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Social History</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.medicalHistory
                  ? caseDetails.medicalHistory.socialHistory
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* presentingComplaint */}
          <div className={sectionDivStyle}>
            {" "}
            <h1 className={sectionHeadingStyle}>Presenting Complaint</h1>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Chief Complaint</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.presentingComplaint
                  ? caseDetails.presentingComplaint.chiefComplaint
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>
                History of Presenting Illness
              </label>
              <p className={textStyle}>
                {caseDetails && caseDetails.presentingComplaint
                  ? caseDetails.presentingComplaint.historyOfPresentingIllness
                  : ""}
              </p>
            </div>
          </div>

          {/* reviewOfSystems */}
          <div className={sectionDivStyle}>
            {" "}
            <h1 className={sectionHeadingStyle}>Review Of Systems</h1>
            <div className={infoDivStyle}>
              <label className={labelStyle}>General</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.general
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Respiratory</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.respiratory
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Cardiovascular</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.cardiovascular
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Musculoskeletal</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.musculoskeletal
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Gastrointestinal</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.gastrointestinal
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Neurological</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.neurological
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Genitourinary</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.genitourinary
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Endocrine</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.endocrine
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Dermatological</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.dermatological
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Psychiatric</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.psychiatric
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Hematological</label>
              <p className={textStyle}>
                {caseDetails && caseDetails.reviewOfSystems
                  ? caseDetails.reviewOfSystems.hematological
                  : ""}
              </p>
            </div>
          </div>

          {/* physicalExaminationFindings */}
          <div className={sectionDivStyle}>
            {" "}
            <h1 className={sectionHeadingStyle}>
              Physical Examination Findings
            </h1>
            <div className={infoDivStyle}>
              <label className={labelStyle}>Vital Signs</label>
              <p className={textStyle}>
                - Temperature -{" "}
                {caseDetails && caseDetails.physicalExaminationFindings
                  ? caseDetails.physicalExaminationFindings.vitalSigns
                      .temperature.celsius
                  : ""}
              </p>
              <p className={textStyle}>
                - Blood Pressure -{" "}
                {caseDetails && caseDetails.physicalExaminationFindings
                  ? caseDetails.physicalExaminationFindings.vitalSigns
                      .bloodPressure
                  : ""}
              </p>
              <p className={textStyle}>
                - Heart Rate -{" "}
                {caseDetails && caseDetails.physicalExaminationFindings
                  ? caseDetails.physicalExaminationFindings.vitalSigns.heartRate
                  : ""}
              </p>
              <p className={textStyle}>
                - Respiratory Rate -{" "}
                {caseDetails && caseDetails.physicalExaminationFindings
                  ? caseDetails.physicalExaminationFindings.vitalSigns
                      .respiratoryRate
                  : ""}
              </p>
            </div>
            <div className={infoDivStyle}>
              <label className={labelStyle}>
                System Specific Examination Findings
              </label>
              {caseDetails &&
                caseDetails.physicalExaminationFindings &&
                Object.entries(
                  caseDetails.physicalExaminationFindings
                    .systemSpecificExaminationFindings
                ).map(([key, value]) => (
                  <p className={`${textStyle} capitalize`} key={key}>
                    <strong>{key}: </strong>
                    {value as string}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationNewAIPage;

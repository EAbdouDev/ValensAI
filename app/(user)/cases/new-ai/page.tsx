"use client";

import { FC, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";
import DisplayData from "@/components/cases/Display";
import { useSearchParams } from "next/navigation";

interface pageProps {}

const genAI = new GoogleGenerativeAI("AIzaSyByDgYiZKNKho5kJAV24WUl-ZoUda11l5Y");

const NewCaseAIPage: FC<pageProps> = ({}) => {
  const searchParams = useSearchParams();

  const diseaseParams = searchParams.get("d");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
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
            text: 'Generate a comprehensive medical case about a patient with arthritis. Use the following format and structure for the JSON output. Include realistic and detailed information for each section.\n\n{\n  "patientDetails": {\n    "name": "John Doe",\n    "age": 55,\n    "gender": "Male",\n    "occupation": "Office Worker"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Hypertension, Type 2 Diabetes",\n    "familyMedicalHistory": "Mother had osteoarthritis, Father had hypertension",\n    "surgicalHistory": "Appendectomy at age 30",\n    "medications": ["Metformin 500mg BID", "Lisinopril 10mg daily"],\n    "allergies": "None",\n    "socialHistory": "Non-smoker, occasional alcohol use"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Joint pain and stiffness",\n    "historyOfPresentingIllness": "The patient reports gradual onset of joint pain and stiffness in the knees and hands over the past 6 months. Symptoms are worse in the morning and improve with movement. There is occasional swelling in the affected joints."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue, weight gain",\n    "musculoskeletal": "Joint pain, stiffness, swelling in knees and hands",\n    "cardiovascular": "No chest pain, palpitations",\n    "respiratory": "No shortness of breath, cough",\n    "gastrointestinal": "No abdominal pain, changes in bowel habits"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": "98.6°F",\n      "bloodPressure": "130/85 mmHg",\n      "heartRate": "72 bpm",\n      "respiratoryRate": "16 breaths per minute"\n    },\n    "generalExamination": "Overweight, no acute distress",\n    "systemSpecificExaminationFindings": {\n      "musculoskeletal": "Tenderness and swelling in bilateral knees and hands, decreased range of motion in affected joints"\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "CBC": "Within normal limits",\n      "ESR": "Elevated at 30 mm/hr",\n      "CRP": "Elevated at 15 mg/L"\n    },\n    "imagingStudies": {\n      "xray": "X-ray of knees shows joint space narrowing and osteophyte formation"\n    }\n  },\n  "differentialDiagnosis": [\n    "Osteoarthritis",\n    "Rheumatoid arthritis",\n    "Gout"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Osteoarthritis"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Ibuprofen",\n        "dosage": "400mg",\n        "frequency": "TID as needed for pain"\n      },\n      {\n        "name": "Glucosamine",\n        "dosage": "500mg",\n        "frequency": "BID"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Physical therapy",\n      "Weight loss program",\n      "Low-impact exercise regimen"\n    ],\n    "followUpPlan": "Follow-up in 6 weeks for reassessment and possible adjustment of treatment plan"\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on the importance of weight management and regular exercise"\n  },\n  "feedbackCriteria": {\n    "assessmentCriteria": [\n      "Accuracy of diagnosis",\n      "Thoroughness of history-taking",\n      "Appropriateness of treatment plan"\n    ]\n  }\n}\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "patientDetails": {\n    "name": "John Doe",\n    "age": 55,\n    "gender": "Male",\n    "occupation": "Office Worker"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Hypertension, Type 2 Diabetes",\n    "familyMedicalHistory": "Mother had osteoarthritis, Father had hypertension",\n    "surgicalHistory": "Appendectomy at age 30",\n    "medications": [\n      "Metformin 500mg BID",\n      "Lisinopril 10mg daily"\n    ],\n    "allergies": "None",\n    "socialHistory": "Non-smoker, occasional alcohol use, sedentary lifestyle"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Joint pain and stiffness",\n    "historyOfPresentingIllness": "The patient reports gradual onset of joint pain and stiffness in the knees and hands over the past 6 months. Symptoms are worse in the morning and improve with movement after about an hour.  He experiences stiffness after prolonged sitting as well.  There is occasional swelling in the affected joints. Pain is rated 5/10 at its worst and limits his ability to perform certain activities such as gardening and playing with his grandchildren."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue, weight gain of 10 lbs in the past year",\n    "musculoskeletal": "Joint pain, stiffness, swelling in knees and hands, limited range of motion in the hands",\n    "cardiovascular": "No chest pain, palpitations",\n    "respiratory": "No shortness of breath, cough",\n    "gastrointestinal": "No abdominal pain, changes in bowel habits"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": "98.6°F",\n      "bloodPressure": "130/85 mmHg",\n      "heartRate": "72 bpm",\n      "respiratoryRate": "16 breaths per minute"\n    },\n    "generalExamination": "Overweight, no acute distress",\n    "systemSpecificExaminationFindings": {\n      "musculoskeletal": "Tenderness and mild swelling in bilateral knees and hands, decreased range of motion in affected joints, crepitus in both knees during flexion and extension. Heberden\'s nodes present bilaterally on the distal interphalangeal joints of both hands.",\n      "neurological": "No sensory deficits. Normal reflexes in upper and lower extremities."\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "CBC": "Within normal limits",\n      "ESR": "Elevated at 30 mm/hr",\n      "CRP": "Elevated at 15 mg/L",\n      "RF": "Negative", \n      "Anti-CCP": "Negative"\n    },\n    "imagingStudies": {\n      "xray": "X-ray of knees shows joint space narrowing, subchondral sclerosis, and osteophyte formation in both knees"\n    }\n  },\n  "differentialDiagnosis": [\n    "Osteoarthritis",\n    "Rheumatoid arthritis",\n    "Gout",\n    "Psoriatic arthritis"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Osteoarthritis"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Acetaminophen",\n        "dosage": "500 mg",\n        "frequency": "Two tablets every 6 hours as needed for pain"\n      },\n      {\n        "name": "Topical NSAID (e.g., Diclofenac gel)",\n        "dosage": "Apply a thin layer",\n        "frequency": "To affected joints 4 times daily"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Physical therapy referral for range of motion exercises and strengthening",\n      "Weight loss program referral",\n      "Low-impact exercise regimen recommendation (e.g., walking, swimming, cycling)",\n      "Patient education on osteoarthritis, including disease process and management" \n    ],\n    "followUpPlan": "Follow-up in 4 weeks to assess response to treatment and adjust plan as needed. Consider referral to rheumatologist if symptoms worsen or do not improve with conservative management."\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on the importance of weight management and regular exercise for managing osteoarthritis. He expresses understanding and willingness to comply with the treatment plan. He is concerned about the potential side effects of long-term NSAID use, so alternative pain management options were discussed."\n  },\n  "feedbackCriteria": {\n    "assessmentCriteria": [\n      "Accuracy of diagnosis",\n      "Thoroughness of history-taking and physical exam",\n      "Appropriateness of diagnostic tests",\n      "Appropriateness of treatment plan",\n      "Patient education and communication"\n    ]\n  }\n}\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "now I want about asthma \n" }],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "patientDetails": {\n    "name": "Jane Smith",\n    "age": 32,\n    "gender": "Female",\n    "occupation": "Teacher"\n  },\n  "medicalHistory": {\n    "pastMedicalHistory": "Asthma diagnosed at age 8, Eczema, Seasonal Allergies",\n    "familyMedicalHistory": "Mother has asthma and allergies, Father has hypertension",\n    "surgicalHistory": "Tonsillectomy and adenoidectomy at age 6",\n    "medications": ["Albuterol inhaler 2 puffs every 4-6 hours as needed for wheezing or shortness of breath", "Fluticasone propionate inhaler 100 mcg 2 puffs twice daily"],\n    "allergies": "Dust mites, pollen, cats",\n    "socialHistory": "Non-smoker, occasional social drinker, lives with partner and one cat"\n  },\n  "presentingComplaint": {\n    "chiefComplaint": "Increased wheezing and shortness of breath",\n    "historyOfPresentingIllness": "The patient presents with a 3-day history of worsening wheezing and shortness of breath. She reports increased cough, particularly at night, and difficulty catching her breath after climbing stairs. She denies fever, chest pain, or sputum production. She attributes her symptoms to recent exposure to her cat and increased pollen counts."\n  },\n  "reviewOfSystems": {\n    "general": "Fatigue, sleep disturbances due to cough",\n    "respiratory": "Wheezing, shortness of breath, cough, chest tightness",\n    "cardiovascular": "No chest pain, palpitations",\n    "gastrointestinal": "No nausea, vomiting, or diarrhea"\n  },\n  "physicalExaminationFindings": {\n    "vitalSigns": {\n      "temperature": "98.9°F",\n      "bloodPressure": "120/75 mmHg",\n      "heartRate": "95 bpm",\n      "respiratoryRate": "20 breaths per minute"\n    },\n    "generalExamination": "Mild respiratory distress, using accessory muscles to breathe",\n    "systemSpecificExaminationFindings": {\n      "respiratory": "Diffuse wheezing bilaterally on auscultation, prolonged expiratory phase, decreased air movement"\n    }\n  },\n  "diagnosticTests": {\n    "labResults": {\n      "None performed at this visit" :""\n    },\n    "pulmonaryFunctionTests": {\n      "Spirometry": "Forced expiratory volume in 1 second (FEV1) is 70% of predicted, FEV1/FVC ratio is reduced at 65%, indicating obstructive lung disease. Significant improvement in FEV1 (>12%) noted after bronchodilator administration." \n    }\n  },\n  "differentialDiagnosis": [\n    "Asthma exacerbation",\n    "Upper respiratory infection",\n    "Allergic reaction"\n  ],\n  "finalDiagnosis": {\n    "confirmedDiagnosis": "Asthma exacerbation"\n  },\n  "treatmentPlan": {\n    "medications": [\n      {\n        "name": "Albuterol inhaler",\n        "dosage": "2 puffs every 4 hours for the next 24-48 hours",\n        "frequency": ""\n      },\n      {\n        "name": "Prednisone (oral corticosteroid)",\n        "dosage": "40mg daily",\n        "frequency": "Once daily for 5 days"\n      }\n    ],\n    "nonPharmacologicalInterventions": [\n      "Continue current regimen of fluticasone propionate inhaler",\n      "Avoid known allergens (dust mites, pollen, cats)",\n      "Asthma action plan review and update",\n      "Peak flow monitoring at home"\n    ],\n    "followUpPlan": "Follow-up with primary care physician in 1 week to assess symptom control and lung function. Referral to allergist for further evaluation and management of allergies."\n  },\n  "additionalNotes": {\n    "observations": "Patient educated on the importance of allergen avoidance and adherence to her asthma action plan. She was provided with a peak flow meter and instructions on how to monitor her symptoms at home. The risks and benefits of continuing to live with a cat were discussed."\n  },\n  "feedbackCriteria": {\n    "assessmentCriteria": [\n      "Accuracy of diagnosis",\n      "Thoroughness of history-taking and physical exam",\n      "Appropriateness of diagnostic tests",\n      "Appropriateness of treatment plan",\n      "Patient education and counseling"\n    ]\n  }\n}\n```',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (diseaseParams !== "") {
      submit(diseaseParams);
    }
  }, [diseaseParams]);

  const [input, setInput] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (input: string | null) => {
    if (input === "") {
      return;
    }
    setLoading(true);
    const result = await chatSession.sendMessage(input || "");
    console.table(result);
    if (result) {
      const jsonResponse =
        result.response.candidates?.[0].content.parts[0].text;
      if (jsonResponse) {
        console.table(jsonResponse);
        setResults(JSON.parse(jsonResponse));
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-full flex h-full flex-col  ">
      <main className="flex-1 h-full ">
        <div className="h-full">
          <div className=" max-w-5xl mx-auto  p-6 rounded-t-2xl dark:bg-[#0c0c0c] my-6">
            {loading && (
              <Loader2 className="mt-6 mx-auto w-6 h-6 animate-spin" />
            )}

            {results && (
              <div className=" space-y-10">
                <div className=" rounded-xl   space-y-6  ">
                  <h1 className="font-semibold text-2xl border-b pb-2">
                    Patient Details
                  </h1>
                  <div className=" space-y-2 ">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h3 className="font-medium opacity-50">Name</h3>
                      <p className=" text-lg">
                        {results && results.patientDetails
                          ? results.patientDetails.name
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h3 className="font-medium opacity-50">Age</h3>
                      <p className=" text-lg">
                        {results && results.patientDetails
                          ? results.patientDetails.age
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h3 className="font-medium opacity-50">Gender </h3>
                      <p className=" text-lg">
                        {results && results.patientDetails
                          ? results.patientDetails.gender
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                      <h3 className="font-medium opacity-50">Occupation </h3>
                      <p className=" text-lg">
                        {results && results.patientDetails
                          ? results.patientDetails.occupation
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" rounded-xl   space-y-6">
                  <h1 className="font-semibold text-2xl border-b pb-2">
                    Medical History
                  </h1>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">
                      Past Medical History{" "}
                    </h3>
                    <p className=" text-lg">
                      {results && results.medicalHistory
                        ? results.medicalHistory.pastMedicalHistory
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">
                      Family Medical History{" "}
                    </h3>
                    <p className=" text-lg">
                      {results && results.medicalHistory
                        ? results.medicalHistory.familyMedicalHistory
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">
                      Surgical History{" "}
                    </h3>
                    <p className=" text-lg">
                      {results && results.medicalHistory
                        ? results.medicalHistory.surgicalHistory
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Medications </h3>
                    <p className="space-y-2 flex flex-col justify-start items-start text-lg">
                      {results &&
                      results.medicalHistory &&
                      Array.isArray(results.medicalHistory.medications)
                        ? results.medicalHistory.medications.map((m) => (
                            <span key={m}>- {m}</span>
                          ))
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Allergies </h3>
                    <p className=" text-lg">
                      {results && results.medicalHistory
                        ? results.medicalHistory.allergies
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Social History </h3>
                    <p className=" text-lg">
                      {results && results.medicalHistory
                        ? results.medicalHistory.socialHistory
                        : ""}
                    </p>
                  </div>
                </div>

                <div className=" rounded-xl   space-y-6">
                  <h1 className="font-semibold text-2xl border-b pb-2">
                    Presenting Complaint
                  </h1>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Chief Complaint </h3>
                    <p className=" text-lg">
                      {results && results.presentingComplaint
                        ? results.presentingComplaint.chiefComplaint
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">
                      History of presenting illness{" "}
                    </h3>
                    <p className=" text-lg">
                      {results && results.presentingComplaint
                        ? results.presentingComplaint.historyOfPresentingIllness
                        : ""}
                    </p>
                  </div>
                </div>

                <div className=" rounded-xl   space-y-6">
                  <h1 className="font-semibold text-2xl border-b pb-2">
                    Review Of Systems
                  </h1>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">General</h3>
                    <p className=" text-lg">
                      {results && results.reviewOfSystems
                        ? results.reviewOfSystems.general
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">ENT</h3>
                    <p className=" text-lg">
                      {results && results.reviewOfSystems
                        ? results.reviewOfSystems.ENT
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Gastrointestinal</h3>
                    <p className=" text-lg">
                      {results && results.reviewOfSystems
                        ? results.reviewOfSystems.gastrointestinal
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className=" rounded-xl   space-y-6">
                  <h1 className="font-semibold text-2xl border-b pb-2">
                    Physical Examination Findings
                  </h1>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Temperature</h3>
                    <p className=" text-lg">
                      {results && results.physicalExaminationFindings
                        ? results.physicalExaminationFindings.vitalSigns
                            .temperature
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Blood Pressure</h3>
                    <p className=" text-lg">
                      {results && results.physicalExaminationFindings
                        ? results.physicalExaminationFindings.vitalSigns
                            .bloodPressure
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Heart Rate</h3>
                    <p className=" text-lg">
                      {results && results.physicalExaminationFindings
                        ? results.physicalExaminationFindings.vitalSigns
                            .heartRate
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2">
                    <h3 className="font-medium opacity-50">Respiratory Rate</h3>
                    <p className=" text-lg">
                      {results && results.physicalExaminationFindings
                        ? results.physicalExaminationFindings.vitalSigns
                            .respiratoryRate
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {results && results.error && <p>{results.error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCaseAIPage;

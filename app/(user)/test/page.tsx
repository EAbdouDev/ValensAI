"use client";
import { FC, useState, useEffect } from "react";
import { generateObject, generateText, streamObject, tool } from "ai";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import combinedSchema, { stepSchemas } from "@/lib/schema";

import { z } from "zod";

// Define the comprehensive schema that includes all fields from individual schemas with descriptions
const medicalCaseSchema = z.object({
  // Basic Patient Information
  patient_name: z.string().describe("Patient name"),
  age: z.string().describe("Patient age"),
  gender: z.string().describe("Patient gender"),
  occupation: z.string().describe("Patient occupation"),
  height: z.string().describe("Patient height"),
  weight: z.string().describe("Patient weight"),

  // Complaints
  chief_complaint: z.string().describe("Chief complaint of the patient"),
  history_of_presenting_illness: z
    .string()
    .describe("History of presenting illness"),

  // Review of Systems
  general: z.string().describe("General review"),
  endocrine: z.string().describe("Endocrine review"),
  psychiatric: z.string().describe("Psychiatric review"),
  respiratory: z.string().describe("Respiratory review"),
  neurological: z.string().describe("Neurological review"),
  genitourinary: z.string().describe("Genitourinary review"),
  hematological: z.string().describe("Hematological review"),
  cardiovascular: z.string().describe("Cardiovascular review"),
  dermatological: z.string().describe("Dermatological review"),
  musculoskeletal: z.string().describe("Musculoskeletal review"),
  gastrointestinal: z.string().describe("Gastrointestinal review"),

  // Physical Examination
  heart_rate: z.string().describe("Heart rate"),
  temperature: z.string().describe("Temperature"),
  blood_pressure: z.string().describe("Blood pressure"),
  respiratory_rate: z.string().describe("Respiratory rate"),

  // Diagnostic Tests
  lab_results: z
    .array(
      z.object({
        testName: z.string().describe("Name of the test"),
        results: z
          .object({
            parameter: z.string().describe("Test parameter"),
            value: z.number().describe("Value of the parameter"),
            unit: z.string().describe("Unit of the parameter"),
            referenceRange: z
              .string()
              .describe("Reference range of the parameter"),
          })
          .array()
          .describe("List of results for the test"),
      })
    )
    .describe("Lab results"),
  imaging_studies_results: z.string().describe("Imaging studies results"),
  other_tests_results: z.string().describe("Other tests results"),

  // Diagnosis
  possible_diagnoses: z.string().describe("Possible diagnoses"),
  final_diagnosis: z.string().describe("Final diagnosis"),

  // Treatment
  medications: z.string().describe("Medications prescribed"),
  non_pharmacological_interventions: z
    .string()
    .describe("Non-pharmacological interventions"),
  follow_up_plan: z.string().describe("Follow-up plan"),

  // Feedback Criteria
  communication_skills_criteria: z
    .string()
    .describe("Communication skills criteria"),
});

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [medicalCase, setMedicalCase] = useState<any>(null);
  const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBJL5LZQYMXilvAdqRmksOOk7u7XFuVSMg",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await generateObject({
        model: google("models/gemini-1.5-pro-latest"),

        schema: medicalCaseSchema,
        prompt:
          "Generate a comprehensive medical case about a patient with GERD with full lab tests values",
      });
      console.log("done");
      setMedicalCase(result);
      //   try {
      //     const { object } = await generateObject({
      //       model: google("models/gemini-1.5-pro-latest"),

      //       schema: medicalCaseSchema,
      //       prompt: "Generate a full medical case.",
      //     });

      //     setMedicalCase(object);
      //   } catch (error) {
      //     console.error("Error fetching medical case:", error);
      //   }
    };

    fetchData();
  }, []);

  console.log(medicalCase);

  if (!medicalCase) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Generated Medical Case</h1>
      {/* <p>{medicalCase}</p> */}
      <pre>{JSON.stringify(medicalCase, null, 2)}</pre>
    </div>
  );
};

export default Page;

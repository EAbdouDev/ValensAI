import { z } from "zod";

// Step 1: Basic Patient Information
const basicPatientInfoSchema = z.object({
  patient_name: z.string().min(1, "Patient name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  occupation: z.string().min(1, "Occupation is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
});

// Step 2: Complaints
const complaintsSchema = z.object({
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  history_of_presenting_illness: z
    .string()
    .min(1, "History of presenting illness is required"),
});

// Step 3: Review of Systems
const reviewOfSystemsSchema = z.object({
  general: z.string().min(1, "General review is required"),
  endocrine: z.string().min(1, "Endocrine review is required"),
  psychiatric: z.string().min(1, "Psychiatric review is required"),
  respiratory: z.string().min(1, "Respiratory review is required"),
  neurological: z.string().min(1, "Neurological review is required"),
  genitourinary: z.string().min(1, "Genitourinary review is required"),
  hematological: z.string().min(1, "Hematological review is required"),
  cardiovascular: z.string().min(1, "Cardiovascular review is required"),
  dermatological: z.string().min(1, "Dermatological review is required"),
  musculoskeletal: z.string().min(1, "Musculoskeletal review is required"),
  gastrointestinal: z.string().min(1, "Gastrointestinal review is required"),
});

// Step 4: Physical Examination
const vitalSignsSchema = z.object({
  heart_rate: z.string().min(1, "Heart rate is required"),
  temperature: z.string().min(1, "Temperature is required"),
  blood_pressure: z.string().min(1, "Blood pressure is required"),
  respiratory_rate: z.string().min(1, "Respiratory rate is required"),

  media: z.any().optional(),
});

// Step 5: Diagnostic Tests
const diagnosticTestsSchema = z.object({
  lab_results: z.string().min(1, "Lab results are required"),
  imaging_studies_results: z
    .string()
    .min(1, "Imaging studies results are required"),
  other_tests_results: z.string().min(1, "Other tests results are required"),
  media: z.any().optional(),
});

// Step 6: Diagnosis
const diagnosisSchema = z.object({
  possible_diagnoses: z.string().min(1, "Possible diagnoses are required"),
  final_diagnosis: z.string().min(1, "Final diagnosis is required"),
});

// Step 7: Treatment
const treatmentSchema = z.object({
  medications: z.string().min(1, "Medications are required"),
  non_pharmacological_interventions: z
    .string()
    .min(1, "Non-pharmacological interventions are required"),
  follow_up_plan: z.string().min(1, "Follow-up plan is required"),
  media: z.any().optional(),
});

// Step 8: Feedback Criteria
const feedbackCriteriaSchema = z.object({
  communication_skills_cretria: z
    .string()
    .min(1, "Communication skills criteria are required"),
  dignosis_cretria: z.string().min(1, "Diagnosis criteria are required"),
  patient_clinical_report_cretria: z
    .string()
    .min(1, "Patient clinical report criteria are required"),
  media: z.any().optional(),
});

// Map each step to its corresponding schema
export const stepSchemas = [
  basicPatientInfoSchema,
  complaintsSchema,
  reviewOfSystemsSchema,
  vitalSignsSchema,
  diagnosticTestsSchema,
  diagnosisSchema,
  treatmentSchema,
  feedbackCriteriaSchema,
];

const combinedSchema = z.object({
  basicPatientInfo: basicPatientInfoSchema,
  complaints: complaintsSchema,
  reviewOfSystems: reviewOfSystemsSchema,
  vitalSigns: vitalSignsSchema,
  diagnosticTests: diagnosticTestsSchema,
  diagnosis: diagnosisSchema,
  treatment: treatmentSchema,
  feedbackCriteria: feedbackCriteriaSchema,
});

export default combinedSchema;

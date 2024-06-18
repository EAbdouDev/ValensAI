import { z } from "zod";

export const BasicDetailsSchema = z.object({
  name: z.string().min(1, "Patient name is required"),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Age must be a positive number")
  ),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be either male or female" }),
  }),
  occupation: z.string().optional(),
});

export const MedicalHistorySchema = z.object({
  past_medical_history: z.string().nullable().optional(),
  family_medical_history: z.string().nullable().optional(),
  surgical_history: z.string().nullable().optional(),
  medications: z.string().nullable().optional(),
  allergies: z.string().nullable().optional(),
  social_history: z.string().nullable().optional(),
});

export const ComplaintSchema = z.object({
  chief_complaint: z.string().min(4, "Cheif complaints are nesseray to add."),
  history_of_presenting_illness: z.string().nullable().optional(),
});

export const ReviewOfSystemsSchema = z.object({
  systematic_review: z.string().nullable().optional(),
});

export const PhysicalExamSchema = z.object({
  vital_signs: z.string().nullable().optional(),
  general_examination: z.string().nullable().optional(),
  system_specific_examination_findings: z.string().nullable().optional(),
});

export const DiagnosticTestsSchema = z.object({
  lab_results: z.string().nullable().optional(),
  imaging_studies: z.string().nullable().optional(),
  other_tests_results: z.string().nullable().optional(),
});

export const DiagnosisSchema = z.object({
  possible_diagnoses: z.string().nullable().optional(),
  final_diagnosis: z.string().min(4, "Final Diagnosis is nesseray to add."),
});

export const TreatmentSchema = z.object({
  medications: z.string().nullable().optional(),
  non_pharmacological_interventions: z.string().nullable().optional(),
  follow_up_plan: z.string().nullable().optional(),
});

export const FeedbackCretriaSchema = z.object({
  communication_assessment_criteria: z.string().nullable().optional(),
  medical_report_criteria: z.string().nullable().optional(),
  additional_notes: z.string().nullable().optional(),
});

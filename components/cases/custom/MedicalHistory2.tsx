import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicalHistorySchema } from "@/lib/schema";

import { Textarea } from "@/components/ui/textarea";
import { inputGroupStye, labelStyle } from "./MultiStepForm";

type MedicalHistory2Data = z.infer<typeof MedicalHistorySchema>;

interface MedicalHistory2Props {
  onSubmit: (data: MedicalHistory2Data) => void;
}

const MedicalHistory2: React.FC<MedicalHistory2Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicalHistory2Data>({
    resolver: zodResolver(MedicalHistorySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className={inputGroupStye}>
        <label htmlFor="pastMedicalHistory" className={labelStyle}>
          Past Medical History
        </label>
        <Controller
          name="past_medical_history"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="familyMedicalHistory" className={labelStyle}>
          Family Medical History
        </label>
        <Controller
          name="family_medical_history"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="surgicalHistory" className={labelStyle}>
          Surgical History
        </label>
        <Controller
          name="surgical_history"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="medications" className={labelStyle}>
          Medications
        </label>
        <Controller
          name="medications"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="allergies" className={labelStyle}>
          Allergies
        </label>
        <Controller
          name="allergies"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="socialHistory" className={labelStyle}>
          Social History
        </label>
        <Controller
          name="social_history"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ""}
              placeholder="Enter past medical history..."
              rows={5}
            />
          )}
        />
      </div>
    </form>
  );
};

export default MedicalHistory2;

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicDetailsSchema } from "@/lib/schema";
import { inputGroupStye, inputStyle, labelStyle } from "./MultiStepForm";

type BasicPatientInfo1Data = z.infer<typeof BasicDetailsSchema>;

interface BasicPatientInfo1Props {
  onSubmit: (data: BasicPatientInfo1Data) => void;
}

const BasicPatientInfo1: React.FC<BasicPatientInfo1Props> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicPatientInfo1Data>({
    resolver: zodResolver(BasicDetailsSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className={inputGroupStye}>
        <label htmlFor="name" className={labelStyle}>
          Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className={inputStyle}
              placeholder="Enter patient name..."
            />
          )}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="age" className={labelStyle}>
          Age
        </label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <input type="number" {...field} className={inputStyle} />
          )}
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="gender" className={labelStyle}>
          Gender
        </label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select {...field} className="border w-full p-2 rounded-lg">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        />
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>
      <div className={inputGroupStye}>
        <label htmlFor="occupation" className={labelStyle}>
          Occupation
        </label>
        <Controller
          name="occupation"
          control={control}
          render={({ field }) => <input {...field} className={inputStyle} />}
        />
        {errors.occupation && (
          <p className="text-red-500">{errors.occupation.message}</p>
        )}
      </div>
    </form>
  );
};

export default BasicPatientInfo1;

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const PresentingComplaint3Schema = z.object({
  chiefComplaint: z
    .string()
    .nonempty({ message: "Chief complaint is required" }),
  historyOfPresentingIllness: z
    .string()
    .nonempty({ message: "History of presenting illness is required" }),
});

type PresentingComplaint3Data = z.infer<typeof PresentingComplaint3Schema>;

interface PresentingComplaint3Props {
  onNext: (data: PresentingComplaint3Data) => void;
}

const PresentingComplaint3: React.FC<PresentingComplaint3Props> = ({
  onNext,
}) => {
  const { control, handleSubmit } = useForm<PresentingComplaint3Data>({
    resolver: zodResolver(PresentingComplaint3Schema),
  });

  const onSubmit = (data: PresentingComplaint3Data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="chiefComplaint">Chief Complaint</label>
        <Controller
          name="chiefComplaint"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
      </div>
      <div>
        <label htmlFor="historyOfPresentingIllness">
          History of Presenting Illness
        </label>
        <Controller
          name="historyOfPresentingIllness"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default PresentingComplaint3;

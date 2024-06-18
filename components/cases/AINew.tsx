"use client";
import { FC, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePlus, Plus, Sparkle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import useNewAIModal from "@/zuztand/NewAIModal";
import { useRouter } from "next/navigation";

interface NewProps {}

const AINew: FC<NewProps> = ({}) => {
  const { isOpen, setIsOpen } = useNewAIModal();
  const [disease, setDisease] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (disease !== "") {
      setError("");
    }
  }, [disease]);

  const onSumbit = (e: FormEvent) => {
    e.preventDefault();

    if (disease === "") {
      setError("Disease name can't be empty!");
      return;
    }

    if (disease !== "") {
      router.push(`/cases/new-ai?d=${disease}`);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Generate using AI</DialogTitle>
          <DialogDescription>
            You can create a custom case or use Gemini AI to generate new case.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col justify-start items-start gap-2 mt-2"
          onSubmit={onSumbit}
        >
          <label>Please write the disease</label>
          <input
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            name="disease"
            placeholder="eg. asthma"
            lang="en"
            className="w-full border p-2 rounded-lg"
          />

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <div className="flex justify-end items-end pt-6 w-full">
            <button
              type="submit"
              className=" dark:bg-white dark:text-black bg-blue-500 rounded-lg px-4 py-2 font-medium "
            >
              Generate
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AINew;

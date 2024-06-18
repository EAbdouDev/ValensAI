"use client";
import { FC } from "react";
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
import AINew from "./AINew";
import useNewAIModal from "@/zuztand/NewAIModal";

interface NewProps {}

const New: FC<NewProps> = ({}) => {
  const { isOpen, setIsOpen } = useNewAIModal();
  return (
    !isOpen && (
      <Dialog>
        <DialogTrigger className=" flex flex-col justify-center items-center gap-6 border-2 border-dashed dark:border-[#5d5d5d]   font-medium p-8 rounded-xl text-2xl">
          <Plus className="w-10 h-10" />
          New Case
        </DialogTrigger>
        <DialogContent className="bg-background pb-10">
          <DialogHeader>
            <DialogTitle>Create New Case</DialogTitle>
            <DialogDescription>
              You can create a custom case or use Gemini AI to generate new
              case.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Link
              href={`/cases/new-custom`}
              className=" flex-1 rounded-lg border-2 p-4 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition-all ease-in-out flex flex-col gap-4 text-lg font-medium"
            >
              <FilePlus />
              Custom Case
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className=" flex-1 rounded-lg border-2 p-4 hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition-all ease-in-out flex flex-col gap-4 text-lg font-medium"
            >
              <Sparkle className="text-pink-500" />
              Generate using AI
            </button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default New;

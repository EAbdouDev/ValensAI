"use client";

import { FC, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePenLine, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import useNewCase from "@/zuztand/NewCase";
import { v4 as uuidv4 } from "uuid";

interface pageProps {}

const CommPage: FC<pageProps> = ({}) => {
  const { name, setName } = useNewCase();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleNextAI = (e: FormEvent) => {
    e.preventDefault();
    if (name === "") {
      setError("Disease name can't be empty!");
      return;
    }

    if (name !== "") {
      router.push(`/cases/new/comm/ai/${uuidv4()}`);
    }
  };

  const handleNextCustom = (e: FormEvent) => {
    e.preventDefault();
    if (name === "") {
      setError("Disease name can't be empty!");
      return;
    }

    if (name !== "") {
      router.push(`/cases/new/comm/custom/${uuidv4()}`);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center flex-grow">
      <div className="min-h-[50%] min-w-[50%] max-w-5xl mx-auto  rounded-2xl p-6 ">
        <h1 className="text-2xl font-bold">
          New Communication Skills Assesment Case
        </h1>
        <p className="text-base  mt-2 opacity-60">
          You create the case details from scratch, or let Gemini handle it for
          you, and you can still edit it.
        </p>

        <div className="flex gap-6 w-full justify-center items-center mt-16  ">
          <div className="w-full h-full flex-1">
            <Dialog>
              <DialogTrigger className="hover:bg-[#f8f8f8] dark:hover:bg-[#1f1f1f] transition-all ease-in-out border-2 rounded-xl py-4 px-6 w-full h-[200px] flex flex-col justify-center items-start gap-4 text-xl font-medium ">
                <FilePenLine className="w-8 h-8" />
                Create Case From Scratch
                <span className="text-sm">Recommended</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Case From Scratch</DialogTitle>
                  <DialogDescription>
                    You can to fill in the required case details to feed the AI
                    with you custom case data.
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="space-y-2 mt-2 w-full"
                  onSubmit={handleNextCustom}
                >
                  <label>Enter Disease Name</label>
                  <input
                    name="disease"
                    placeholder="eg. asthma "
                    className="p-2 border w-full rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <div className="w-full pt-2 flex justify-end items-end">
                    <button className="dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-md font-medium">
                      Next
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full h-full flex-1">
            <Dialog>
              <DialogTrigger className="hover:bg-[#f8f8f8] dark:hover:bg-[#1f1f1f] transition-all ease-in-out border-2 rounded-xl py-4 px-6 w-full h-[200px] flex flex-col justify-center items-start gap-4 text-xl font-medium ">
                <Sparkles className="w-8 h-8" />
                Create Case Using Gemini
                <span className="text-sm">Still in early stages</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Case Using Gemini</DialogTitle>
                  <DialogDescription>
                    Gemini will generate a full case details for you, all
                    details can be edited.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-2 mt-2 w-full" onSubmit={handleNextAI}>
                  <label>Enter Disease Name</label>
                  <input
                    name="disease"
                    placeholder="eg. asthma "
                    className="p-2 border w-full rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <div className="w-full pt-2 flex justify-end items-end">
                    <button className="dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-md font-medium">
                      Next
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommPage;

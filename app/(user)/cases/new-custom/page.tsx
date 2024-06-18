import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Metadata } from "next";
import MultiStepForm from "@/components/cases/custom/MultiStepForm";

export const metadata: Metadata = {
  title: "New custom case",
};

interface pageProps {}

const NewCaseCustomPage: FC<pageProps> = ({}) => {
  return (
    <div className="w-full  max-w-5xl mx-auto p-4">
      <header className="flex justify-start items-center gap-4 w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Link href={`/cases`}>
                <ArrowLeft />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to cases</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <h1 className="text-xl font-semibold">New Custom Case</h1>
      </header>
      <section className="mt-10">
        <MultiStepForm />
      </section>
    </div>
  );
};

export default NewCaseCustomPage;

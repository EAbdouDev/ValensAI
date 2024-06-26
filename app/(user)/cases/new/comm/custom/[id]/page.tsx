"use client";

import CaseStepsSidebar from "@/components/cases/custom/CaseStepsSidebar";
import CustomCaseForm from "@/components/cases/custom/CustomCaseForm";
import useNewCase from "@/zuztand/NewCase";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  const { name } = useNewCase();
  return (
    <div className="min-h-full flex px-4">
      <nav className="w-72 flex-none ...">
        <CaseStepsSidebar />
      </nav>

      <main className="flex-1 min-w-0 overflow-auto ...">
        <CustomCaseForm />
      </main>
    </div>
  );
};

export default page;

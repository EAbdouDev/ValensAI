"use client";

import { caseSteps } from "@/lib/CaseSteps";
import { FC } from "react";

interface CaseStepsSidebarProps {}

const CaseStepsSidebar: FC<CaseStepsSidebarProps> = ({}) => {
  return (
    <div className="px-6 py-8 2xl:px-2">
      <ul className="flex flex-col justify-start items-start gap-6">
        {caseSteps.map((step) => (
          <li className="font-medium flex justify-start items-center gap-3 px-4 py-2 hover:bg-[#141414] rounded-lg w-full cursor-pointer">
            {step.icon}
            {step.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseStepsSidebar;

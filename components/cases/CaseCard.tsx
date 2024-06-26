import { createClerkClient } from "@clerk/nextjs/server";
import { ClipboardPlus, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface CaseCardProps {
  caseData: any;
}

export const UserCaseCard: FC<CaseCardProps> = ({ caseData }) => {
  const cardColor = () => {
    if (caseData.case_type === "comm") {
      return "bg-gradient-to-br from-[#f7f0ff] to-[#a78afe] text-black";
    }
  };

  const caseType = () => {
    if (caseData.case_type === "comm") {
      return "Communication skills case";
    }
  };
  return (
    <Link
      href={`/cases/pre-case/${caseData.id}`}
      className="flex flex-col justify-start items-start gap-6 dark:bg-[#101010] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] dark:shadow-none    py-3 px-4 rounded-xl "
    >
      <div className="header flex justify-between items-center w-full">
        <span
          className={`flex justify-center items-center p-2 rounded-full ${cardColor()} w-8 h-8 `}
        >
          {/* <ClipboardPlus /> */}
        </span>

        <EllipsisVertical className="w-6 h-6 opacity-70" />
      </div>

      <div className="mt-6 space-y-2 max-w-full">
        <h1 className="text-xl font-medium truncate">{caseData.case_title}</h1>
        <p className="text-sm opacity-60 font-light">
          Apr 6, 2024 - {caseType()}
        </p>
      </div>
    </Link>
  );
};

interface CaseCardProps {
  caseData: any;
}

export const CommunityCaseCard: FC<CaseCardProps> = ({ caseData }) => {
  const [user, setUser] = useState<any>(null);

  const cardColor = () => {
    if (caseData.case_type === "comm") {
      return "bg-gradient-to-br from-[#f7f0ff] to-[#a78afe] text-black";
    }
  };

  const caseType = () => {
    if (caseData.case_type === "comm") {
      return "Communication skills case";
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      });
      const response = await clerkClient.users.getUser(caseData.created_by);
      console.log(response);
      if (response) {
        setUser(response);
      }
    };

    getUser();
  }, []);

  console.log(user);
  return (
    <Link
      href={`/cases/pre-case/${caseData.id}`}
      className="flex flex-col justify-start items-start gap-6 dark:bg-[#101010] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] dark:shadow-none    py-3 px-4 rounded-xl "
    >
      <div className="header flex justify-between items-center w-full">
        <span
          className={`flex justify-center items-center p-2 rounded-full ${cardColor()} w-8 h-8 `}
        >
          {/* <ClipboardPlus /> */}
        </span>

        <EllipsisVertical className="w-6 h-6 opacity-70" />
      </div>

      <div className="mt-6 space-y-2 max-w-full">
        <h1 className="text-xl font-medium truncate">{caseData.case_title}</h1>
        <p className="text-sm opacity-60 font-light">
          Apr 6, 2024 - {user?.id}
        </p>
      </div>
    </Link>
  );
};

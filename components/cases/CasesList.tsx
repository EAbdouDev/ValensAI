"use client";
import { FC, useEffect, useState } from "react";
import { CommunityCaseCard, UserCaseCard } from "./CaseCard";
import New from "./New";

interface PublicCasesListProps {
  serverCases: any;
}

export const UserCasesList: FC<PublicCasesListProps> = ({ serverCases }) => {
  const [cases, setCases] = useState<any[]>(serverCases);

  useEffect(() => {
    setCases(serverCases);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full h-full">
      <New />
      {cases?.map((caseData: any) => (
        <UserCaseCard caseData={caseData} key={caseData.id} />
      ))}
    </div>
  );
};

interface PublicCasesListProps {
  serverCases: any;
}

export const PublicCasesList: FC<PublicCasesListProps> = ({ serverCases }) => {
  const [cases, setCases] = useState<any[]>(serverCases);

  useEffect(() => {
    setCases(serverCases);
  }, [serverCases]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full h-full">
      {cases?.map((caseData: any) => (
        <CommunityCaseCard caseData={caseData} key={caseData.id} />
      ))}
    </div>
  );
};

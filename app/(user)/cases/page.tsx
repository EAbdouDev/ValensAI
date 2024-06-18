import AINew from "@/components/cases/AINew";
import CaseCard from "@/components/cases/CaseCard";
import New from "@/components/cases/New";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Cases",
};

const CasesPage: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="w-full h-full p-4  max-w-5xl mx-auto 2xl:my-16 my-4 pb-20">
        <section>
          <h1 className="text-2xl font-semibold">Your Cases</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full h-full mt-6 ">
            <New />
            <CaseCard />
            <CaseCard />
          </div>
        </section>

        <section className="my-16">
          <h1 className="text-2xl font-semibold">Community Cases</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full h-full mt-6 ">
            <CaseCard />
            <CaseCard />
            <CaseCard />
            <CaseCard />
            <CaseCard />
          </div>
        </section>
      </div>

      <AINew />
    </>
  );
};

export default CasesPage;

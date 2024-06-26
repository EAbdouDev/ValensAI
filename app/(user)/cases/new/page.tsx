"use client";

import TypeSelector from "@/components/cases/type/TypeSelector";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full h-full p-4  max-w-7xl mx-auto 2xl:my-10 my-4 pb-20 ">
      <div className="flex justify-start items-center gap-4 p-4 rounded-xl bg-[#181818]">
        <Link href={"/cases"}>
          <ArrowLeft />
        </Link>
        <h1 className="font-medium">
          Select form these case types to continue
        </h1>
      </div>
      <TypeSelector />
    </div>
  );
};

export default page;

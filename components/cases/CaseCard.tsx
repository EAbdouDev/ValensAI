import { ClipboardPlus, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface CaseCardProps {}

const CaseCard: FC<CaseCardProps> = ({}) => {
  return (
    <Link
      href={"/case"}
      className="flex flex-col justify-start items-start gap-6 dark:bg-[#101010] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] dark:shadow-none    py-3 px-4 rounded-xl "
    >
      <div className="header flex justify-between items-center w-full">
        <span className="flex justify-center items-center p-2 rounded-full dark:bg-[#212121] dark:text-white ">
          <ClipboardPlus />
        </span>

        <EllipsisVertical className="w-6 h-6 opacity-70" />
      </div>

      <div className="mt-6 space-y-2">
        <h1 className="text-xl font-medium">Arthritis Case</h1>
        <p className="text-sm opacity-60 font-light">Apr 6, 2024</p>
      </div>
    </Link>
  );
};

export default CaseCard;

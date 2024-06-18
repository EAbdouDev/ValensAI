"use client";
import MainNav from "@/components/navigation/MainNav";
import { Github } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col h-screen">
      <header className="bg-transparent">
        <MainNav />
      </header>
      {/* <!-- main container --> */}
      <div className="flex-1 flex flex-col overflow-y-auto ">
        <main className="flex-1   pb-10  ">{children}</main>
        <div className="sticky top-[100vh] border-t flex justify-between items-center p-4">
          {" "}
          <p className="text-sm dark:opacity-70 flex justify-start items-center gap-2 font-medium">
            <img
              src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
              alt="geminiLogo"
            />
            Powerd by Google Gemini AI
          </p>
          <p className="text-sm dark:opacity-70 flex justify-start items-center gap-2 font-medium">
            Developed by{" "}
            <Link
              href={"https://github.com/EAbdouDev/simmedAI"}
              target="_blank"
              prefetch={false}
              className="flex justify-start items-center gap-1 hover:border-b "
            >
              <Github className="w-4 h-4" /> Eslam Abdou
            </Link>
          </p>
        </div>
      </div>
      {/* <!-- end main container --> */}

      {/* <footer className="border-t flex justify-between items-center p-4">
       
      </footer> */}
    </div>
  );
};

export default layout;

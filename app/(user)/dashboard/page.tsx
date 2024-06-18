import Greetings from "@/components/dashboard/Greetings";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Dashboard",
};

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full h-full p-4  max-w-7xl mx-auto 2xl:my-10 my-4 pb-20">
      <Greetings />
    </div>
  );
};

export default page;

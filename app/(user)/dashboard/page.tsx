import Greetings from "@/components/dashboard/Greetings";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Dashboard",
};

const page: FC<pageProps> = ({}) => {
  return (
    <div className="p-4">
      <Greetings />
    </div>
  );
};

export default page;

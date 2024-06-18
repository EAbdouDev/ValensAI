import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Recordings",
};

const page: FC<pageProps> = ({}) => {
  return <div>Recordings</div>;
};

export default page;

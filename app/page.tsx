import PubNav from "@/components/navigation/PubNav";
import { SignOutButton } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | MedSim AI",
};

export default function Home() {
  return (
    <main className="">
      <PubNav />
      <SignOutButton />
      Home Page
    </main>
  );
}

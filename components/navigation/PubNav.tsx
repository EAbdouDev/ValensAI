"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";

interface PubNavProps {}

const PubNav: FC<PubNavProps> = ({}) => {
  const { isSignedIn, user } = useUser();
  return (
    <div className="flex justify-between items-center w-full h-[60px] border-b px-10">
      <div className="flex justify-center items-center gap-4">
        <span className="flex justify-center items-center gap-2">
          <h1 className="font-bold text-xl">MedSim AI</h1>
          <p className="border p-1 rounded-lg text-xs bg-secondary text-secondary-foreground ">
            Experimental
          </p>
        </span>
      </div>

      <div>
        {isSignedIn && (
          <Link href={`/${user.username}/dashboard`}>Dashboard</Link>
        )}
        {/* <SignOutButton /> */}
        {!isSignedIn && (
          <SignInButton
            fallbackRedirectUrl={"/dashboard"}
            forceRedirectUrl={"/dashboard"}
          />
        )}
      </div>
    </div>
  );
};

export default PubNav;

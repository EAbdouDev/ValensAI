"use client";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";
import { FlipWords } from "../ui/flip-words";

interface GreetingsProps {}

const Greetings: FC<GreetingsProps> = ({}) => {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-3xl font-semibold flex justify-start items-center gap-2 ">
        <p className="opacity-70">Hey</p>{" "}
        {user ? (
          <FlipWords
            words={[
              `${
                user?.username!.charAt(0).toUpperCase() +
                user?.username?.slice(1)
              } `,
            ]}
          />
        ) : (
          ""
        )}
      </h1>
    </div>
  );
};

export default Greetings;

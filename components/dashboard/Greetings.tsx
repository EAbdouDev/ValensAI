"use client";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";

interface GreetingsProps {}

const Greetings: FC<GreetingsProps> = ({}) => {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-3xl font-semibold capitalize">
        Hey {user?.username}
      </h1>
    </div>
  );
};

export default Greetings;

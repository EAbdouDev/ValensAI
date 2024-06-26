"use client";
import useCaseSim from "@/zuztand/CaseSimState";
import { Mic, MicOff } from "lucide-react";
import { FC } from "react";

interface VoiceChatProps {}

const VoiceChat: FC<VoiceChatProps> = ({}) => {
  const { isListening, setIsListening } = useCaseSim();
  return (
    <button
      className="p-3 bg-[#1b1b1b] rounded-r-xl rounded-l-sm transition-all ease-in-out hover:opacity-80"
      onClick={() => setIsListening(!isListening)}
    >
      {" "}
      {isListening ? <MicOff /> : <Mic />}
    </button>
  );
};

export default VoiceChat;

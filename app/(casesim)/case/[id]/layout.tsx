import ChatBox from "@/components/CaseSim/ChatBox";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import VoiceChat from "@/components/CaseSim/VoiceChat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";

interface layoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const layout: FC<layoutProps> = async ({ children, params }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("v_cases")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <div>Error</div>;
  }
  return <div className="h-full w-full">{children}</div>;
};

export default layout;

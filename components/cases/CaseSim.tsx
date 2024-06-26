"use client";

import { FC, useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Howl } from "howler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useUser } from "@clerk/nextjs";
import { ElevenLabsClient } from "elevenlabs";
import useCaseSim from "@/zuztand/CaseSimState";
import ChatBox from "../CaseSim/ChatBox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VoiceChat from "../CaseSim/VoiceChat";

interface CaseSimProps {
  caseDetails: any;
}

const CaseSim: FC<CaseSimProps> = ({ caseDetails }) => {
  const { user } = useUser();
  const { setTextInput } = useCaseSim();
  const [responses, setResponses] = useState<
    { role: string; response: string }[]
  >([]);
  const [userStarted, setUserStarted] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
  const elevenLabsApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  const controls = useAnimation();

  const elevenlabs = new ElevenLabsClient({
    apiKey: elevenLabsApiKey,
  });

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are an AI simulating a patient based on dynamic case details provided. Answer any questions the user asks about the patient's medical history, presenting complaint, review of systems, or treatment plan based on the given case details. Return your response in JSON format as {'role': 'response'}. If the user asks about test results or physical examination findings, return the response as {'teacher': 'response'}. If the user asks for the diagnosis, treatment plan, or differential diagnosis, return {'teacher': 'hahahah, Got you cheating, please focus on finding this out by yourself'}. If the user asks about something not related to the case, return {'patient': 'I don't know'}.\n\n\n\n### Example Questions and Responses:\n1. User: \"What is your age?\"\n   AI: {'patient': 'I am 48 years old.'}\n2. User: \"Do you have any allergies?\"\n   AI: {'patient': 'No, I don't have any allergies.'}\n3. User: \"What were the results of your MRI?\"\n   AI: {'teacher': 'The MRI of the spine demonstrates a T10-T11 transverse myelitis lesion.'}\n4. User: \"What medications are you taking?\"\n   AI: {'patient': 'I am currently prescribed Methylprednisolone 1000mg IV daily for 5 days.'}\n5. User: \"How often do you exercise?\"\n   AI: {'patient': 'I try to exercise a few times a week when my schedule allows.'}\n6. User: \"What's the weather like?\"\n   AI: {'patient': 'I don't know.'}\n7. User: \"What is the diagnosis?\"\n   AI: {'teacher': 'hahahah, Got you cheating, please focus on finding this out by yourself'}\n\nUse the provided case details to answer accurately and clearly, I will provide it for you \n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, I'm ready to simulate a patient based on the case details you provide. Please give me the case details, and I'll do my best to respond accurately in JSON format as instructed. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `Here are the case details: ${JSON.stringify(
              caseDetails.case_details,
              null,
              2
            )}`,
          },
        ],
      },
    ],
  });

  const handleGenerateResponse = async (textInput: string) => {
    setUserStarted(true);
    const result = await chatSession.sendMessage(textInput);
    const jsonResponseAI =
      result.response.candidates?.[0].content.parts[0].text;

    try {
      const jsonResponse = JSON.parse(jsonResponseAI || "{}");
      console.log(jsonResponse, "JSOOOOON");
      const role = Object.keys(jsonResponse)[0];
      const responseText = jsonResponse[role];

      const audioDuration = await createAudioStreamFromText(responseText, role);
      setResponses((prevResponses) => [
        ...prevResponses,
        { role, response: responseText },
      ]);
      controls.start({ opacity: 1 });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const createAudioStreamFromText = async (text: string, role: string) => {
    const voice = role === "teacher" ? "Frederick Surrey" : "Rachel";
    const modelID =
      role === "teacher" ? "E114JgZCPgbtrAu2XDSc" : "eleven_turbo_v2";
    const prefix =
      role === "teacher"
        ? "Teacher:"
        : `${caseDetails.case_details.patientDetails.name}:`;

    const audioStream = await elevenlabs.generate({
      voice,
      model_id: "eleven_turbo_v2",
      text: ` ${text}`,
    });

    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks);
    const audioBlob = new Blob([content], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const sound = new Howl({
      src: [audioUrl],
      format: ["mp3"],
      onload: () => {
        const duration = sound.duration();
        animateText(`${prefix} ${text}`, duration);
        sound.play();
      },
      onend: () => URL.revokeObjectURL(audioUrl),
    });
  };

  const animateText = (text: string, duration: number) => {
    const words = text.split(" ");
    const wordDuration = duration / words.length;
    let animatedText = "";

    words.forEach((word, index) => {
      setTimeout(() => {
        animatedText += ` ${word}`;
        setResponses((prevResponses) => {
          const lastResponse = prevResponses[prevResponses.length - 1];
          if (lastResponse.role === "animation") {
            lastResponse.response = animatedText;
            return [...prevResponses.slice(0, -1), lastResponse];
          }
          return [
            ...prevResponses,
            { role: "animation", response: animatedText },
          ];
        });
      }, index * wordDuration * 1000);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const chatContainer = document.querySelector("#chat-container");
      if (!chatContainer) return;

      const chatMessages = Array.from(chatContainer.children);
      chatMessages.forEach((message, index) => {
        const messageElement = message as HTMLElement; // Type assertion
        const rect = messageElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentageInView = Math.min(
          Math.max((rect.bottom - rect.top) / windowHeight, 0),
          1
        );
        messageElement.style.opacity = percentageInView.toString();
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col h-screen">
      <header className=" py-4 px-6  flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={"/cases"}>
                  <ArrowLeft />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to cases, this would cancel this session.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <h1 className="text-xl font-semibold">{caseDetails.case_title}</h1>
          <span className="flex justify-start items-center gap-2 text-sm border-2 rounded-lg py-1 px-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>{" "}
            Recording
          </span>
        </div>

        <div className="text-lg font-medium">10:20</div>
      </header>
      {/* <!-- main container --> */}
      <div className="flex-1 flex flex-row overflow-y-hidden">
        <main className="flex-1  overflow-y-auto border-2 m-2 rounded-xl ">
          <ResizablePanelGroup direction="horizontal" className="">
            <ResizablePanel minSize={50} maxSize={70} className="p-6">
              <div className=" w-full h-full">
                {!userStarted && (
                  <div className="flex flex-col justify-center items-center w-full h-full flex-grow">
                    <h1 className="text-3xl font-bold capitalize mb-3 bg-gradient-to-r from-blue-500 to-rose-500 bg-clip-text text-transparent">
                      Hey {user?.username}, ready to start the simulation?
                    </h1>
                    <p className="opacity-70 font-light text-lg">
                      Start talking to the patient, the time is ticking...
                    </p>
                  </div>
                )}

                <div
                  id="chat-container"
                  className="flex flex-col w-full h-full overflow-y-auto gap-2"
                >
                  <AnimatePresence>
                    {userStarted &&
                      responses.map((response, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: -index * 10 }}
                          exit={{ opacity: 1 }}
                          className="mt-4"
                        >
                          <p className="text-lg">
                            {response.role === "animation" && (
                              <span className="">{response.response}</span>
                            )}
                          </p>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              minSize={40}
              maxSize={40}
              className="p-6 overflow-y-auto"
            >
              <h1 className="text-xl">Clinical Notes</h1>
              <div className="mt-6 bg-[#161616dd] rounded-lg w-full h-full p-6 overflow-y-auto  ">
                <p
                  className="font-mono w-full h-full outline-none"
                  contentEditable
                >
                  Start writing patient clinical notes
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
      {/* <!-- end main container --> */}

      <footer className="p-4  ">
        <div className="flex flex-col justify-center items-center gap-4 max-w-2xl mx-auto">
          <div className="w-full flex justify-center items-center gap-1">
            <div className="w-[90%]">
              <ChatBox
                patient_name={caseDetails.case_details.patientDetails.name}
                onSubmit={handleGenerateResponse}
              />
            </div>
            <div>
              <VoiceChat />
            </div>
          </div>
          <p className="text-xs font-light opacity-60 text-center">
            Valens AI can make mistakes. Development Still in early stages.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CaseSim;

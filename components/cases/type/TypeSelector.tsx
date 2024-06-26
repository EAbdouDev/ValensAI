"use client";
import { FC } from "react";
import { stagger, useAnimate } from "framer-motion";
import Title from "./Title";
import Card, { Communication, DiffDiagnosis, Treatment } from "./Card";
import { useTypeStore } from "./store";

const types = [
  {
    id: "comm",
    title: "Communication Skills Assesment",
    description:
      "Intense headache: due to increased intracranial tension Vomiting: due to increased intracranial tension and pressure on the chemoreceptor trigger zone Vertigo: damage of the vestibular centers in the cerebellum and is usually accompanied by nystagmus Blurring of vision: due to increased intracranial tension and papilledema of the optic disc Patient was not alert: the brain abscess causing some stupor",
    card: Communication,
  },
  {
    id: "diff",
    title: "Differential Diagnosis Assesment",
    description:
      "Intense headache: due to increased intracranial tension Vomiting: due to increased intracranial tension and pressure on the chemoreceptor trigger zone Vertigo: damage of the vestibular centers in the cerebellum and is usually accompanied by nystagmus Blurring of vision: due to increased intracranial tension and papilledema of the optic disc Patient was not alert: the brain abscess causing some stupor",
    card: DiffDiagnosis,
  },
  {
    id: "treat",
    title: "Treatment Plan Assesment",
    description:
      "Intense headache: due to increased intracranial tension Vomiting: due to increased intracranial tension and pressure on the chemoreceptor trigger zone Vertigo: damage of the vestibular centers in the cerebellum and is usually accompanied by nystagmus Blurring of vision: due to increased intracranial tension and papilledema of the optic disc Patient was not alert: the brain abscess causing some stupor",
    card: Treatment,
  },
];

interface TypeSelectorProps {}

const TypeSelector: FC<TypeSelectorProps> = ({}) => {
  const { inViewType } = useTypeStore();
  console.log(inViewType);
  return (
    <div className="w-full flex gap-20 items-start h-full">
      <div className="w-full py-[30vh]">
        <ul>
          {types.map((type: any) => (
            <li key={type.id}>
              <Title
                id={type.id}
                title={type.title}
                description={type.description}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sticky top-0 h-screen flex items-center">
        <div className=" relative w-full aspect-square bg-gray-100 rounded-3xl shadow-lg ">
          {types.map((type: any) => (
            <type.card key={type.id} id={type.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeSelector;

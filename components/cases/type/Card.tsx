import classNames from "classnames";
import { FC, ReactNode } from "react";
import { useTypeStore } from "./store";
import Link from "next/link";

type CardProps = {
  gradient: string;
  children: ReactNode;
  id: string;
};

const Card: FC<CardProps> = ({ gradient, children, id }) => {
  const inViewType = useTypeStore((state) => state.inViewType);
  return (
    <div
      className={classNames(
        ` absolute inset-0 h-full bg-gradient-to-br  w-full rounded-3xl transition-all ease-in-out  `,
        gradient,
        inViewType === id ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

export default Card;

export const Communication = ({ id }: CardProps) => {
  const inViewType = useTypeStore((state) => state.inViewType);
  return (
    <Card id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <div className="relative">
        <Link
          href={`/cases/new/${inViewType}`}
          className="absolute bottom-4 right-4 border px-4 py-2 text-lg rounded-lg dark:bg-white dark:text-black font-medium "
        >
          Create a communication skills case
        </Link>
      </div>
    </Card>
  );
};
export const DiffDiagnosis = ({ id }: CardProps) => {
  const inViewType = useTypeStore((state) => state.inViewType);
  return (
    <Card id={id} gradient="from-[#f5fbff] to-[#addeff] ">
      <div className="relative">
        <Link
          href={`/cases/new/${inViewType}`}
          className="absolute bottom-4 right-4 border px-4 py-2 text-lg rounded-lg dark:bg-white dark:text-black font-medium"
        >
          Create a differential diagnosis case
        </Link>
      </div>
    </Card>
  );
};
export const Treatment = ({ id }: CardProps) => {
  const inViewType = useTypeStore((state) => state.inViewType);
  return (
    <Card id={id} gradient="from-[#fff6f5] to-[#ffd8ad]">
      <div className="relative">
        <Link
          href={`/cases/new/${inViewType}`}
          className="absolute bottom-4 right-4 border px-4 py-2 text-lg rounded-lg dark:bg-white dark:text-black font-medium"
        >
          Create a treatment plan case
        </Link>
      </div>
    </Card>
  );
};

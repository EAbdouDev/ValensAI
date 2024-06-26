import { useInView } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import classNames from "classnames";
import { useTypeStore } from "./store";

interface TitleProps {
  title: string;
  description: string;
  id: string;
}

const Title: FC<TitleProps> = ({ title, id, description }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const setInViewType = useTypeStore((state) => state.setInViewType);

  useEffect(() => {
    if (isInView) {
      setInViewType(id);
    }
  }, [isInView, id, setInViewType]);

  return (
    <div ref={ref} className="py-36">
      <h1
        className={classNames(
          " text-5xl  font-semibold transition-all ease-in-out",
          isInView
            ? "dark:opacity-100 text-black dark:text-white"
            : "text-gray-300 dark:opacity-40"
        )}
      >
        {title}
      </h1>
      <p className="font-light pt-8 opacity-50 text-justify">{description}</p>
    </div>
  );
};

export default Title;

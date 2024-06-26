import Link from "next/link";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      PreCase - {params.id}
      <div>
        <Link href={`/case/${params.id}`}>Start the simulation</Link>
      </div>
    </div>
  );
};

export default page;

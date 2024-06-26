import CaseSim from "@/components/cases/CaseSim";
import { createClient } from "@/lib/supabase/server";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const CasePage: FC<pageProps> = async ({ params }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("v_cases")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full h-full">
      <CaseSim caseDetails={data} />
    </div>
  );
};

export default CasePage;

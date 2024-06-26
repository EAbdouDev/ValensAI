import AINew from "@/components/cases/AINew";
import { PublicCasesList, UserCasesList } from "@/components/cases/CasesList";
import New from "@/components/cases/New";
import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata: Metadata = {
  title: "Cases",
};

const CasesPage: FC<pageProps> = async ({}) => {
  const user = await currentUser();
  const supabase = createClient();

  const fetchUserCases = async () => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("v_cases")
        .select("*")
        .eq("created_by", user.id);

      if (error) {
        throw error.message;
      }

      return data;
    }
  };

  const fetchCommunityCases = async () => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("v_cases")
        .select("*")
        .neq("created_by", user.id);

      if (error) {
        throw error.message;
      }

      return data;
    }
  };

  const userCases = await fetchUserCases();
  const communityCases = await fetchCommunityCases();

  return (
    <>
      <div className="w-full h-full p-4  max-w-7xl mx-auto 2xl:my-10 my-4 pb-20">
        <section>
          <h1 className="text-2xl font-semibold">Your Cases</h1>
          <div className="w-full h-full mt-6   ">
            {userCases ? (
              <UserCasesList serverCases={userCases} />
            ) : (
              "loading..."
            )}
          </div>
        </section>

        <section className="my-10">
          <h1 className="text-2xl font-semibold">Community Cases</h1>
          <div className="w-full mt-6 ">
            <PublicCasesList serverCases={communityCases} />
          </div>
        </section>
      </div>

      <AINew />
    </>
  );
};

export default CasesPage;

import axios from "axios";
import { useQuery } from "react-query";
import { OrgsCard } from "./GitOrgsCard";
import { ParagraphSkeleton } from "../../Common/ParagraphSkeleton";

export const GitOrgs = () => {
  var {
    isLoading,
    error,
    data,
  }: { isLoading?: boolean; error?: any; data?: Array<any> } = useQuery(
    "orgs",
    async () =>
      axios
        .get("https://api.github.com/users/hadiazt/orgs")
        .then(({ data }) => data)
        .catch((error) => console.error("Error fetching:", error))
  );

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow font-IR_Sans">
        مشارکت ها ({data?.length})
      </div>
      <div className="overflow-x-auto w-full grid  justify-items-center grid-flow-col gap-4 px-2 md:px-8 pt-2 pb-4">
        {isLoading ? (
          [1, 2, 3, 4, 5].map(() => (
            <ParagraphSkeleton className="w-80 md:w-96 h-full p-4 md:p-8" />
          ))
        ) : data && data.length > 0 ? (
          data?.map((repo, key) => <OrgsCard data={repo} key={key} />)
        ) : (
          <div className="font-IR_Sans text-white text-2xl">
            پروژه ای با فیلترهای تعریف شده یافت نشد
          </div>
        )}
      </div>
    </>
  );
};

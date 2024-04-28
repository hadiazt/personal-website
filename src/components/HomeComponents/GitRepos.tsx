import axios from "axios";
import { useQuery } from "react-query";
import { ReviewCard } from "./GitRepos/ReviewCard";
import { ParagraphSkeleton } from "../Common/ParagraphSkeleton";

export const GitRepos = () => {
  var {
    isLoading,
    error,
    data,
  }: { isLoading?: boolean; error?: any; data?: Array<any> } = useQuery(
    "repos",
    () =>
      axios
        .get("https://api.github.com/users/hadiazt/repos")
        .then(({ data }) => data)
        .catch((error) => console.error("Error fetching:", error))
  );

  const TOPRepos = data
    ?.filter(
      (repo: { stargazers_count: number; forks_count: number }) =>
        repo.stargazers_count >= 5 || repo.forks_count >= 5
    )
    .sort((repoA, repoB) => {
      const repoAScore = repoA.stargazers_count + repoA.forks_count;
      const repoBScore = repoB.stargazers_count + repoB.forks_count;
      return repoBScore - repoAScore;
    });

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow font-IR_Sans">
        پروژه های متن باز پرطرفدار ({TOPRepos?.length})
      </div>
      <div className="overflow-x-auto w-full grid  justify-items-center grid-flow-col gap-4 px-2 md:px-8 pt-2 pb-4">
        {isLoading ? (
          [1, 2, 3, 4, 5].map(() => (
            <ParagraphSkeleton className="w-80 md:w-96 h-full p-4 md:p-8" />
          ))
        ) : TOPRepos && TOPRepos.length > 0 ? (
          TOPRepos?.map((repo, key) => <ReviewCard data={repo} key={key} />)
        ) : (
          <div className="font-IR_Sans text-white text-2xl">
            پروژه ای با فیلترهای تعریف شده یافت نشد
          </div>
        )}
      </div>
    </>
  );
};

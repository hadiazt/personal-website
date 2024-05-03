import axios from "axios";
import { useQuery } from "react-query";
import { ProjectsCard } from "./ProjectsCard";
import { ParagraphSkeleton } from "../../Common/ParagraphSkeleton";

export const MyProjects = () => {
  const { isLoading, error, data } = useQuery("expertise", () =>
    axios
      .get("api/expertise")
      .then(({ data }) => data)
      .catch((error) => console.error("Error fetching :", error))
  );

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow font-IR_Sans">
        توانایی های من
      </div>
      <div className="grid justify-items-center grid-flow-row md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 px-2 md:px-8">
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <ParagraphSkeleton className="space-y-2 p-8" />
            ))
          : data?.map((item: any, index: number) => (
              <ProjectsCard key={index} data={item} />
            ))}
      </div>
    </>
  );
};

import axios from "axios";
import { useQuery } from "react-query";
import { ProjectsCard } from "./ProjectsCard";
import { ImageAndParagraphSkeleton } from "../../Common/ImageAndParagraphSkeleton";

export const MyProjects = () => {
  const { isLoading, error, data } = useQuery("projects", () =>
    axios
      .get("api/projects")
      .then(({ data }) => data)
      .catch((error) => console.error("Error fetching :", error))
  );

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow font-IR_Sans">
        پروژه های من
      </div>
      <div className="grid justify-items-center grid-flow-row md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-4 px-2 md:px-8">
        {isLoading
          ? [1, 2, 3].map((_, index) => (
              <ImageAndParagraphSkeleton className="space-y-2 p-8" />
            ))
          : data?.map((item: any, index: number) => (
              <ProjectsCard key={index} data={item} />
            ))}
      </div>
    </>
  );
};

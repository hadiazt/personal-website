import Link from "next/link";
import { FaStar, FaTags, FaClone } from "react-icons/fa";

export const ReviewCard = (data: {
  data: {
    name: string;
    description: string;
    created_at: string;
    svn_url: string;
    stargazers_count: number;
    forks: number;
    topics: string[];
  };
}) => {
  const info = data.data;

  return (
    <Link href={info.svn_url} target="_blank">
      <div
        className="flex flex-col justify-between card_stylings w-80 md:w-96 h-full  p-4 md:p-8"
        dir="ltr"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-Snow font-bold">{info.name}</span>
            <div className="text-xs text-LightGray flex items-center gap-1 font-light">
              {info.topics.length > 0 ? <FaTags /> : ""}
              <em>{info.topics.join(", ")}</em>
            </div>
          </div>
          <span className="text-sm text-LightGray font-light">
            {"Created AT " + info.created_at?.split("T")[0]}
          </span>
        </div>
        <div className="text-sm mt-2 text-LightGray font-normal">
          {info.description?.length >= 50
            ? info.description.slice(0, 50) + " ..."
            : info.description}
        </div>
        <div className="flex">
          <div className="flex flex-row gap-2 items-center justify-start bg-MidNightBlack mr-3 text-xs text-Green rounded-full p-2 mt-4 ">
            <FaStar />
            {info.stargazers_count}
          </div>
          <div className="flex flex-row gap-2 items-center justify-start bg-MidNightBlack w-auto text-xs text-Green rounded-full p-2 mt-4 ">
            <FaClone />
            {info.forks}
          </div>
        </div>
      </div>
    </Link>
  );
};

import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import { FaCode, FaUser } from "react-icons/fa";

export const OrgsCard = (data: {
  data: {
    login: string;
    avatar_url: string;
    description: string;
    repos_url: string;
    members_url: string;
  };
}) => {
  try {
    const info = data.data;
    const {
      isLoading: ReposLoading,
      error: RepoError,
      data: ReposData,
    }: { isLoading?: boolean; error?: any; data?: Array<{}> } = useQuery(
      `OrgRepos_${info.login}`,
      async () => axios.get(info.repos_url).then(({ data }) => data)
    );
    const {
      isLoading,
      error,
      data: MembersData,
    }: { isLoading?: boolean; error?: any; data?: Array<{}> } = useQuery(
      `OrgMembers_${info.login}`,
      async () =>
        axios.get(info.members_url.split("{")[0]).then(({ data }) => data)
    );
    const ReposCount = ReposData?.length
      ? ReposData?.length + " / Many Private"
      : false;
    const MembersCount = MembersData?.length
      ? MembersData?.length + " / Many Private"
      : false;

    return (
      <Link href={"https://github.com/orgs/" + info.login} target="_blank">
        <div
          className="flex flex-col card_stylings w-72 md:w-80 h-full p-4 md:p-8"
          dir="ltr"
        >
          <div className="text-center">
            <div className="flex flex-col gap-1 items-center justify-center text-center">
              <img src={info.avatar_url} className="w-44 rounded-3xl" />
              <span className="text-xl mt-5 text-Snow font-bold text-center">
                {info.login}
              </span>
            </div>
          </div>
          <div className="text-sm mt-2 text-LightGray font-normal">
            {info.description?.length >= 70
              ? info.description.slice(0, 70) + " ..."
              : info.description}
          </div>
          <div className="flex">
            <div className="flex flex-row gap-2 items-center justify-start bg-MidNightBlack mr-3 text-xs text-Green rounded-full p-2 mt-4 ">
              <FaCode />
              {ReposCount ? ReposCount : "Private"}
            </div>
            <div className="flex flex-row gap-2 items-center justify-start bg-MidNightBlack w-auto text-xs text-Green rounded-full p-2 mt-4 ">
              <FaUser />
              {MembersCount ? MembersCount : "Private"}
            </div>
          </div>
        </div>
      </Link>
    );
  } catch (error) {
    console.error("Error fetching:", error);
  }
};

export const ExpertiseCard = (data: {
  data?: { title: string; desc: string };
}) => {
  return (
    <div className="h-full space-y-2 p-8 card_stylings">
      <div className=" text-Snow">{data.data?.title}</div>
      <div className="text-sm text-LightGray font-normal">
        {data.data?.desc}
      </div>
    </div>
  );
};

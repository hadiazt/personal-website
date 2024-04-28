import { getObjectKeys } from "../../../utils/utils";
import { DETAILS } from "../../../constants/constants";

export const Location = () => {
  const keys = getObjectKeys(DETAILS);
  return (
    <div className="flex flex-col space-y-1 pt-6 font-IR_Sans" dir="rtl">
      {keys.map((key, index) => {
        return (
          <div key={index} className="flex items-center justify-between">
            <span className="text-Snow text-x font-bold">{key}</span>
            <span className="text-x text-gray-300">
              {DETAILS[key as keyof typeof DETAILS]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

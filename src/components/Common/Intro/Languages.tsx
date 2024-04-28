import { Progress } from "antd";
import { useEffect, useState } from "react";

export const Languages = () => {
  const [persian, setUrdu] = useState(0);
  const [english, setEnglish] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (persian < 99) {
        setUrdu((prevCount) => prevCount + 1);
      }
      if (english < 90) {
        setEnglish((prevCount) => prevCount + 1);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [persian, english]);
  return (
    <div className="flex flex-col space-y-1 pt-6">
      <div className="flex flex-col gap-y-4 font-IR_Sans">
        <span className="text-Snow text-xs font-bold text-right">زبان ها</span>
        <div className="flex flex-row items-center justify-center space-x-6">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Progress
              strokeColor="#1fdf64"
              type="circle"
              percent={english}
              size={75}
            />
            <span className="text-xs font-bold text-Snow">انگلیسی</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Progress
              strokeColor="#1fdf64"
              type="circle"
              percent={persian}
              size={75}
            />
            <span className="text-xs font-bold text-Snow">فارسی</span>
          </div>
        </div>
      </div>
    </div>
  );
};

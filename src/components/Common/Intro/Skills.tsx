import Link from "next/link";
import { LinearBar } from "./LinearBar";
import { SKILLS } from "../../../constants/constants";

export const Skills = () => {
  return (
    <div className="flex flex-col space-y-1 pt-6 font-IR_Sans">
      <div className="flex flex-col gap-y-4">
        <span
          className="text-Snow text-xs font-bold bg-gradient-to-bl"
          dir="rtl"
        >
          تخصص و توانایی ها
        </span>
        <div className="flex flex-col space-y-4">
          {SKILLS.map((skill, index) => {
            return (
              <>
                <Link href={skill.url ? skill.url : "/"} key={index}>
                  <LinearBar
                    title={skill.title}
                    percent={skill.level + "%"}
                    bgColor="bg-Green"
                  />
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

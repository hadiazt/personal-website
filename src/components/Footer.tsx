import { BsGithub } from "react-icons/bs";
import { AiFillCopyrightCircle } from "react-icons/ai";

export const Footer = () => {
  return (
    <div id="intro" className="mt-4 mb-10 lg:mb-0" dir="ltr">
      <div className="flex h-10 items-center justify-between text-xs font-normal text-LightGray py-4 px-2 md:px-4 w-full bg-MidNightBlack">
        <div className="flex items-center">
          <div className="mr-1 text-base">
            <AiFillCopyrightCircle />
          </div>
          <span>{new Date().getFullYear()} hadiazt.</span>
        </div>
        <div className="hidden md:flex items-center">
          <div className="mr-1 text-base">
            <BsGithub />
          </div>
          <a href="https://github.com/hadiazt/personal-website" target="_blank">
            <div>Source Code</div>
          </a>
        </div>
      </div>
    </div>
  );
};

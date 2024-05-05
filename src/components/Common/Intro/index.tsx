import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaLinkedin,
  FaTelegram,
  FaSteam,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { Location } from "./Location";
import { Languages } from "./Languages";
import Hadi from "../../../public/Hadi.jpg";
import { NAME, DESIGNATION, SOCIAL_LINKS } from "../../../constants/constants";

export const Intro = () => {
  return (
    <>
      <div className="header z-50 absolute bg-MidNightBlack backdrop-blur-sm inset-y-0 h-48 top-0 flex items-center justify-center w-full flex-col px-4 gap-y-4">
        <Image
          className="w-28 h-28 rounded-full"
          src={Hadi}
          alt="profile picture"
        />
        <div className="flex flex-col items-center justify-center font-IR_Sans">
          <span className="text-gray-300 text-base font-bold break-normal">
            {NAME}
          </span>
          <span className="text-sm text-LightGray text-center mt-2" dir="rtl">
            {DESIGNATION}
          </span>
        </div>
      </div>

      <div className="beech z-20 flex flex-col overflow-y-scroll pt-48 top-48 space-y-6 divide-y divide-white overflow-x-hidden no-scrollbar px-4">
        <Location />
        <Languages />
        <Skills />
        <Contact />
      </div>

      <div className="footer flex justify-center space-x-6 text-xl items-center bottom-0 z-50 h-10 w-full bg-MidNightBlack text-Snow">
        <Link href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer">
          <FaGithub />
        </Link>
        <Link href={SOCIAL_LINKS.TG} target="_blank" rel="noreferrer">
          <FaTelegram />
        </Link>
        <Link href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">
          <FaDiscord />
        </Link>
        <Link href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer">
          <FaTwitter />
        </Link>
        <Link
          href={SOCIAL_LINKS.LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className=""
        >
          <FaLinkedin />
        </Link>
        <Link
          href={SOCIAL_LINKS.STEAM}
          target="_blank"
          rel="noreferrer"
          className=""
        >
          <FaSteam />
        </Link>
      </div>
    </>
  );
};

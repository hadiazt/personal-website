import { FC } from "react";
import { NavItem } from "./NavItem";
import { ImHome } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { FiAward } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";
import { DrawerLayout } from "../DrawerLayout";
import { HiIdentification } from "react-icons/hi";

interface NavProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export const Nav: FC<NavProps> = ({ setIsOpen, isOpen }) => {
  return (
    <DrawerLayout setIsOpen={setIsOpen} isOpen={isOpen}>
      <div className="absolute z-50 flex flex-col justify-center lg:inset-y-0  -right-0 lg:right-0 w-64 h-screen lg:mt-3 lg:mr-3 lg:h-[96%] bg-DeepNightBlack shadow-2xl md:rounded-xl md:overflow-hidden">
        <div
          onClick={(e) => setIsOpen(false)}
          className="flex text-LightGray absolute top-0 w-full items-center justify-start pl-6 text-sm h-10 bg-EveningBlack"
        >
          <ImCross />
        </div>
        <div className="flex flex-col gap-y-2 px-6 w-full transition">
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={"/"}
            NavIcon={<ImHome />}
            NavText={"خانه"}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={"/contact"}
            NavIcon={<FaHandshake />}
            NavText={"Contact"}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={"/background"}
            NavIcon={<HiIdentification />}
            NavText={"Background"}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={"/portfolio"}
            NavIcon={<FiAward />}
            NavText={"Portfolio"}
          />
        </div>
      </div>
    </DrawerLayout>
  );
};

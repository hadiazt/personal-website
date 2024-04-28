import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

interface NavItemProps {
  setIsOpen: Function;
  NavRoute: string;
  NavIcon: ReactNode;
  NavText: string;
}

export const NavItem: React.FC<NavItemProps> = ({
  setIsOpen,
  NavRoute,
  NavIcon,
  NavText,
}) => {
  const router = useRouter();
  const className =
    router.asPath === `${NavRoute}`
      ? "rounded-xl !text-DeepNightBlack bg-Green font-bold"
      : "";

  return (
    <Link
      onClick={(e) => setIsOpen(false)}
      href={NavRoute}
      className={`${className} font-IR_Sans transition flex items-center px-2 hover:bg-EveningBlack text-SilverGray hover:text-SilverGray rounded-xl  py-1.5 font-semibold space-x-4 text-base`}
    >
      <React.Fragment>{NavIcon}</React.Fragment>
      <span>{NavText}</span>
    </Link>
  );
};

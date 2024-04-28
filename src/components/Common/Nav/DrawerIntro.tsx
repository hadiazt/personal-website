import { FC } from "react";
import { Intro } from "../Intro";
import { DrawerLayout } from "../DrawerLayout";

interface DrawerIntroProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const DrawerIntro: FC<DrawerIntroProps> = ({ setIsOpen }) => {
  const open = true;
  return (
    <DrawerLayout setIsOpen={setIsOpen} isOpen={open}>
      <Intro />
    </DrawerLayout>
  );
};

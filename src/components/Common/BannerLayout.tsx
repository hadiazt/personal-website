import React, { ReactNode } from "react";
import bg from "../../public/images/background.png";

interface BannerLayoutProps {
  children: ReactNode;
}

export const BannerLayout = ({ children }: BannerLayoutProps) => {
  return (
    <div
      className="relative backdrop-blur-sm w-full h-80 bg-fixed z-10"
      style={{
        background: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full bg-gradient-to-t from-MidNightBlack">
        <div className="bg-Black/5 backdrop-blur-sm w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

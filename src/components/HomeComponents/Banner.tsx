import { Link } from "react-scroll";
import Typewriter from "typewriter-effect";
import emoji from "../../public/images/emoji.png";
import { BannerLayout } from "../Common/BannerLayout";
import { HeaderInfo } from "../../constants/constants";

const Banner = () => {
  return (
    <BannerLayout>
      <div className="absolute inset-0 z-20 flex flex-col items-center py-6 justify-center w-full h-full bg-gradient-to-t from-MidNightBlack">
        <div className="bg-LightGray/10 w-[95%] h-[90%] px-4 py-2 rounded-xl overflow-hidden flex md:block">
          <div className="flex items-center md:items-center md:justify-around">
            <div className="">
              <div className="">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl text-Snow font-IR_Sans">
                  سلام، به سایت من خوش آمدید
                </h1>
              </div>
              <div dir="ltr">
                <div className=" py-4 font-cascadia-normal text-Snow pb-4 text-xs h-20 lg:h-auto">
                  <span className="text-Green sm:text-base xl:text-lg font-bold">
                    <span className="inline-block">
                      <Typewriter
                        options={{
                          strings: [
                            "BackEnd Full Stack Developer",
                            "FrontEnd  Mid-Level Developer",
                            "MERN Stack Developer",
                          ],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </span>
                </div>
              </div>
              <Link
                to="intro"
                spy={true}
                smooth={true}
                duration={500}
                offset={-50}
                className="button font-IR_Sans"
              >
                گشت و گزار
              </Link>
            </div>
            <div className="w-48 h-52 relative hidden md:block">
              <img
                className="absolute top-8 w-full h-full"
                src={emoji.src}
                alt="emoji"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-0 md:flex items-center justify-between w-full px-4 xl:px-8 2xl:px-16">
          {HeaderInfo.map((info, index) => {
            return (
              <div className="flex items-center gap-x-1" key={index}>
                <span className="text-xs text-Snow">{info.title}</span>
                <span className="text-base md:text-lg text-Green font-bold">
                  {info.value}+
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </BannerLayout>
  );
};

export default Banner;

"use client";
import AuthComponent from "../components/login-register/AuthComponent";
import BurgerMenu from "../components/navBar/BurgerMenu";
import { useStore } from "../store/zustand";
import RowMenu from "../components/navBar/RowMenu";
import Image from "next/image";
import UserAvatar from "../components/navBar/UserAvatar";
import DesktopAvatar from "../components/navBar/DesktopAvatar";

type ComponentProps = {
  style: "dark" | "light";
};

export default function NavaBar({ style }: ComponentProps) {
  const { authOptions } = useStore();
  return (
    <nav className="w-full bg-transparent p-10 absolute top-0 z-20">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row lg:flex-col md:gap-16 lg:gap-5 lg:text-lg">
          <div className="flex flex-row gap-3">
            <Image
              src={`${style === "light" ? "/logow.svg" : "/logob.svg"}`}
              alt="logo"
              width={200}
              height={200}
              className="w-10"
            />
            <h2
              className={`text-3xl lg:text-4xl font-comorant hidden sm:block ${
                style === "light" ? "text-white" : "text-black"
              }`}
            >
              Complexus
            </h2>
          </div>
          <div
            id="row-menu"
            className="flex-row hidden md:flex relative items-center"
          >
            <RowMenu style={style} />
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <div className="lg:hidden">
            <UserAvatar style={style} />
          </div>
          <div className="hidden lg:block">
            <DesktopAvatar style={style} />
          </div>
        </div>
        <div id="burger-menu" className="flex md:hidden z-10">
          <BurgerMenu style={style} />
        </div>
      </div>
      {authOptions.isVisible && <AuthComponent type={authOptions.type} />}
    </nav>
  );
}

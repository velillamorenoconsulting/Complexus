"use client";
import { useState } from "react";
import AuthComponent from "../components/login-register/AuthComponent";
import BurgerMenu from "../components/navBar/BurgerMenu";
import { useStore } from "../store/zustand";

type ComponentProps = {
  style: "dark" | "light";
};

export default function NavaBar({ style }: ComponentProps) {
  const { authOptions } = useStore();
  return (
    <nav className="w-screen bg-transparent p-10 absolute top-0">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row lg:flex-col gap-28 lg:gap-0">
          <div
            id="Main"
            className={`font-comorant font-bold text-3xl ${
              style === "dark" ? "text-black" : "text-white"
            }`}
          >
            Complexus
          </div>
          <div id="text-menu" className="flex-row hidden sm:flex">
            <p>Hello 1</p>
            <p>Hello 2</p>
          </div>
        </div>
        <div className="hidden sm:block">Avatar</div>
        <div id="burger-menu" className="flex sm:hidden">
          <BurgerMenu style={style} />
        </div>
      </div>
      {authOptions.isVisible && <AuthComponent type={authOptions.type} />}
    </nav>
  );
}

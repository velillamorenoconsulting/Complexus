import React from "react";
import { ThemeType, pageList } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../components/footer/ContactForm";
import SocialMedia from "@/app/components/footer/SocialMedia";

type Props = { style: ThemeType };

export default function Footer({ style }: Props) {
  return (
    <section
      className={`${
        style === "dark" ? "bg-black text-white" : "bg-[#e9f2f2] text-black"
      } min-h-[300px] h-auto p-10`}
    >
      <div className="flex flex-col lg:flex-row justify-around h-full gap-5 md:gap-0">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row gap-2 justify-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={50}
              height={50}
              className="w-6 hidden md:block"
            />
            <h3 className="font-comorant text-4xl font-semibold text-center">
              Corporación Complexus
            </h3>
          </div>
          <div>
            <SocialMedia style={"dark"} />
          </div>
        </div>
        <div className="flex flex-col lg:hidden 2xl:flex 2xl:flex-row items-center justify-center gap-3 font-raleway pt-5 lg:p-0">
          {pageList.map((item) => (
            <Link key={item.key} href={item.redirect}>
              {item.name}
            </Link>
          ))}
        </div>

        <ContactForm style={style} />
      </div>
      <div className="flex flex-col items-center pt-7 lg:p-0">
        <p className="font-raleway">© Corporación Complexus, 2024</p>
      </div>
    </section>
  );
}

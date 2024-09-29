"use client";
import { ThemeType } from "@/app/types/types";
import { isDarkTheme } from "@/app/utils/utils";
import Link from "next/link";
import React from "react";

type ComponentProps = {
  style: ThemeType;
};

export default function RowMenu({ style }: ComponentProps) {
  return (
    <div
      className={`z-10 ${
        isDarkTheme(style) ? "text-black" : "text-white"
      } flex flex-row gap-5 font-raleway md:text-sm mdl:text-md`}
    >
      <Link href="/" className="hover:cursor-pointer">
        Home
      </Link>
      <Link href="/corporation" className="hover:cursor-pointer">
        Corporación
      </Link>
      <Link href="/events" className="hover:cursor-pointer">
        Eventos
      </Link>
      <Link href="/services" className="hover:cursor-pointer">
        Servicios
      </Link>
      <Link href="/contact" className="hover:cursor-pointer">
        Contacto
      </Link>
    </div>
  );
}

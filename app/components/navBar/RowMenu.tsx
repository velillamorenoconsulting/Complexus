"use client";
import { ThemeType, pageList } from "@/app/types/types";
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
      } flex flex-row gap-5 font-raleway md:text-sm lg:text-md`}
    >
      {pageList.map((pageInfo) => (
        <Link
          href={pageInfo.redirect}
          className="hover:cursor-pointer"
          key={pageInfo.key}
        >
          {pageInfo.name}
        </Link>
      ))}
    </div>
  );
}

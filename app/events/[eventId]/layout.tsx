import EventLoading from "@/app/components/events/EventLoading";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <Suspense fallback={<EventLoading />}>{children}</Suspense>;
}

"use client";
import React, { useEffect, useState } from "react";
import { useMemberSession } from "../components/hooks/useMemberSession";
import { useRouter } from "next/navigation";
import ButtonComponent from "../components/base/Button";

export default function MemberDashboard() {
  const member = useMemberSession();
  const redirect = useRouter();
  const [, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!member.loading && member.member) {
      setLoading(false);
    }
  }, [member]);

  return (
    <section className="pt-navbar lg:pt-navbard p-10">
      <div
        className={`rounded-2xl bg-slate-400 gap-5 lg:gap-0 lg:h-24 shadow-inner shadow-slate-600 flex p-5 lg:flex-row flex-col justify-evenly items-center ${member.member?.isAdmin ? "block" : "hidden"}`}
      >
        <div className="text-lg font-raleway">
          Hola <b>{member.member?.email}</b>, eres un administrador
        </div>
        <ButtonComponent
          title="Administrar página"
          action={() => redirect.push("/dashboard/admin")}
        />
      </div>
    </section>
  );
}

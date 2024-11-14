"use client";
import React, { useEffect, useState } from "react";
import { useMemberSession } from "../components/hooks/useMemberSession";

export default function MemberDashboard() {
  const member = useMemberSession();
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!member.loading && member.member) {
      setLoading(false);
    }
  }, [member]);
  return <section className="pt-navbar lg:pt-navbard p-10"></section>;
}

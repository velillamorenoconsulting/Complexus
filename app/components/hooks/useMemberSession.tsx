"use client";
import { Member } from "@/app/api/entities/member.entity";
import { SignedAuth } from "@/app/api/types/auth.types";
import { useStore } from "@/app/store/zustand";
import { ServerResponse } from "@/app/types/responses";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface MemberData {
  member: Partial<Member> | null;
  loading: boolean;
  error: string | null;
}

export const useMemberSession = (): MemberData => {
  const [memberData, setMemberData] = useState<Partial<Member> | null>(null);
  const { member: globalMember, setMember } = useStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseSession = useSession();
  const navigation = useRouter();

  useEffect(() => {
    const fetchData = async (memberId: string) => {
      setLoading(true);
      try {
        const { data } = await axios<ServerResponse<Member>>(
          `${process.env.NEXT_PUBLIC_BE_URL}/member/${memberId}`,
        );
        if (data.message) {
          setMember(data.message);
          setMemberData(data.message);
        }
      } catch (error) {
        navigation.push("/");
        Swal.fire({
          title: "Sin Acceso",
          text: "No eres miembro o no tienes acceso a esta interfaz",
          icon: "warning",
          timer: 2000,
          color: "#ffffff",
          background: "#1E1E1E",
          showConfirmButton: false,
          customClass: {
            title: "font-raleway",
          },
        });
        setError((error as Error).message || "An error ocurred");
      } finally {
        setLoading(false);
      }
    };
    if (baseSession.status === "unauthenticated") {
      navigation.push("/");
      Swal.fire({
        title: "Sin Acceso",
        text: "Deberás iniciar sesión para visualizar esta sección",
        icon: "warning",
        timer: 2000,
        color: "#ffffff",
        background: "#1E1E1E",
        showConfirmButton: false,
        customClass: {
          title: "font-raleway",
        },
      });
    } else if (baseSession.status === "authenticated") {
      if (
        !globalMember ||
        (baseSession.data.user as SignedAuth).id !== globalMember.memberId
      ) {
        fetchData((baseSession.data.user as SignedAuth).id);
      } else {
        setMemberData(globalMember);
      }
    }
  }, [baseSession]);

  return { member: memberData, loading: isLoading, error };
};

"use client";
import { User } from "@/app/api/entities/user.entity";
import { SignedAuth } from "@/app/api/types/auth.types";
import { useStore } from "@/app/store/zustand";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface UserData {
  user: Partial<User> | null;
  loading: boolean;
  error: string | null;
}

export const useUserSessionStrict = (): UserData => {
  const [userData, setUserData] = useState<Partial<User> | null>(null);
  const { user: globalUser, setUser } = useStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const baseSession = useSession();
  const navigation = useRouter();

  useEffect(() => {
    const fetchData = async (userId: string) => {
      setLoading(true);
      try {
        const { data } = await axios<{ message: Partial<User> }>(
          `${process.env.NEXT_PUBLIC_BE_URL}/user/${userId}`,
        );
        if (data.message) {
          setUser(data.message);
          setUserData(data.message);
        }
      } catch (error) {
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
        !globalUser ||
        (baseSession.data.user as SignedAuth).id !== globalUser.userId
      ) {
        fetchData((baseSession.data.user as SignedAuth).id);
      } else {
        setUserData(globalUser);
      }
    }
  }, [baseSession]);

  return { user: userData, loading: isLoading, error };
};

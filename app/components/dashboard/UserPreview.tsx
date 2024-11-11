import { User } from "@/app/api/entities/user.entity";
import { Divider, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type ComponentProps = {
  isLoading: boolean;
  user: Partial<User> | null;
};

export default function UserPreview({ isLoading, user }: ComponentProps) {
  return (
    <div>
      <h4 className="text-2xl font-semibold">Tu perfil</h4>
      <Divider className="my-3" />
      {isLoading ? (
        <div className="flex flex-col gap-8 w-full h-full my-3">
          <Skeleton className="rounded-full self-center aspect-square">
            <div className="rounded-full w-40 h-40"></div>
          </Skeleton>
          <div className="space-y-3 w-full flex flex-col justify-center">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full items-center 3xl:pl-10">
          <div className="rounded-full w-40 h-40">
            <Image
              src={user?.avatarUrl || "/icons/user-defaultb.svg"}
              alt="user_avatar"
              width={200}
              height={200}
              className="w-40"
            />
          </div>
          <div className="flex flex-row gap-7">
            <div className="flex flex-col self-center">
              <h5 className="font-semibold">Nombre:</h5>
              <h5 className="font-semibold">Correo:</h5>
              <h5 className="font-semibold">Pais:</h5>
              <h5 className="font-semibold">Teléfono:</h5>
            </div>
            <div className="flex flex-col self-center">
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>{user?.email}</p>
              <p>{user?.country || "-"}</p>
              <p>{user?.telephone || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

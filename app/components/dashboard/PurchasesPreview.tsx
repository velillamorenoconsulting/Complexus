"use client";
import { Purchase } from "@/app/api/entities/purchase.entity";
import { Divider, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import PurchaseMiniCard from "./PurchaseMiniCard";
import Link from "next/link";

type ComponentProps = { isLoading: boolean; purchases: Purchase[] };

export default function PurchasesPreview({
  isLoading,
  purchases,
}: ComponentProps) {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);
  useEffect(() => {
    if (purchases.length && purchases.length > 2) {
      setPurchaseList(
        purchases
          .sort((a, b) => a.confirmedAt.getTime() - b.confirmedAt.getTime())
          .slice(0, 2),
      );
    } else setPurchaseList(purchases);
  }, [purchases]);
  return (
    <div>
      <h4 className="text-2xl font-semibold">Últimas compras</h4>
      <Divider className="my-3" />
      {isLoading ? (
        <div className="flex flex-col gap-3 my-5">
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full"></div>
          </Skeleton>
        </div>
      ) : purchaseList.length ? (
        <div className="flex flex-col gap-4">
          {purchaseList.map((item) => {
            if (item.isConfirmed) {
              return <PurchaseMiniCard key={item.purchaseId} purchase={item} />;
            }
          })}
          <Divider className="my-1" />
          <Link href="#" className="text-center font-bold">
            Ver más
          </Link>
        </div>
      ) : (
        <p className="font-raleway text-md opacity-70">
          Aún no has realizado compras.
        </p>
      )}
    </div>
  );
}

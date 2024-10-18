"use client";
import { Purchase } from "@/app/api/entities/purchase.entity";
import { Divider, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import PurchaseMiniCard from "./PurchaseMiniCard";

type ComponentProps = { isLoading: boolean; purchases: Purchase[] };

export default function PurchasesPreview({
  isLoading,
  purchases,
}: ComponentProps) {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);
  console.log(purchaseList)
  useEffect(() => {
    if (purchases.length && purchases.length > 4) {
      setPurchaseList(purchases.slice(0, 4));
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
        purchaseList.map((item, idx) => {
            if (item.isConfirmed) {
                return (<PurchaseMiniCard key={item.purchaseId} purchase={item}/>)
            }
        })
      ) : (
        <p className="font-raleway text-md opacity-70">
          Aún no has realizado compras.
        </p>
      )}
    </div>
  );
}

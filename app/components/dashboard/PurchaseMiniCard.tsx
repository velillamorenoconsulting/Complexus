import { Purchase } from "@/app/api/entities/purchase.entity";
import { Card, CardBody, Divider } from "@nextui-org/react";
import React from "react";

type Props = { purchase: Purchase };

export default function PurchaseMiniCard({ purchase }: Props) {
  const purchaseTitle = purchase.isEvent
    ? purchase.event?.title
    : purchase.item?.title;
  const purchaseType = purchase.isEvent ? "Evento" : "Compra";
  const purchaseDate = new Date(purchase.confirmedAt);
  return (
    <Card className="bg-[#e9f2f2]">
      <CardBody className="flex flex-row">
        <h5 className="font-raleway text-2xl font-semibold w-[40%] text-center self-center">
          {purchaseTitle}
        </h5>
        <Divider className="h-auto mx-3" orientation="vertical" />
        <div className="flex flex-col self-center">
          <p>
            <b>Valor pagado:</b>{" "}
            {parseFloat(purchase.basePrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            <b>Fecha de compra:</b> {purchaseDate.toDateString()}
          </p>
          <p>
            <b>Tipo:</b> {purchaseType}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
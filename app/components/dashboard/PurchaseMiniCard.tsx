import { Purchase } from '@/app/api/entities/purchase.entity'
import { Card, CardBody, Divider } from '@nextui-org/react'
import React from 'react'

type Props = { purchase: Purchase }

export default function PurchaseMiniCard({ purchase }: Props) {
  const purchaseTitle = purchase.isEvent ? purchase.event?.title : purchase.item?.title; 
  const purchaseType = purchase.isEvent ? 'Evento' : 'Compra';
  const purchaseDate = new Date(purchase.confirmedAt);
  return (
    <Card>
        <CardBody>
        <h5 className='font-comorant text-2xl font-semibold'>{purchaseTitle}</h5>
        <Divider className='my-1.5'/>
            <div className='flex flex-col'>
                <p>Valor pagado: {purchase.basePrice}</p>
                <p>Fecha de compra: {purchaseDate.toDateString()}</p>
                <p>Tipo de compra: {purchaseType}</p>
            </div>
        </CardBody>
    </Card>
  )
}
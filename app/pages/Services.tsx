import React from 'react'
import ServA from '../sections/services/ServA'
import ServB from '../sections/services/ServB'

type Props = {}

export default function Services({}: Props) {
  return (
    <section>
        <ServA />
        <ServB />
    </section>
  )
}
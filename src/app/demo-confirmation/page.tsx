'use client'

import React from "react"
import { OrderConfirmationCard } from "@/components/ui/order-confirmation-card"
import { MeshBackground } from "@/components/ui/MeshBackground"

export default function OrderConfirmationCardDemo() {
  const [transactionMeta] = React.useState(() => {
    const now = new Date()
    return {
      formattedDate: now.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      orderId: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    }
  })

  const handleGoToAccount = () => {
    alert("Перенаправление на главную страницу...")
    window.location.href = "/"
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black p-4 overflow-hidden">
      <MeshBackground opacity={0.2} />
      
      {/* Structural blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      <OrderConfirmationCard
        orderId={transactionMeta.orderId}
        paymentMethod="Безналичный расчет (с НДС)"
        dateTime={transactionMeta.formattedDate}
        totalAmount="Бесплатный расчет"
        onGoToAccount={handleGoToAccount}
        title="Ваш запрос успешно отправлен"
        buttonText="Вернуться на главную"
        className="shadow-[0_0_80px_rgba(0,255,163,0.05)] border-white/[0.08]"
      />
    </div>
  )
}

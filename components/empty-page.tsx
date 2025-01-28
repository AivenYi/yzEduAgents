'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function EmptyPage({ title }: { title: string }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <Button 
        onClick={() => router.back()}
        className="bg-white/20 hover:bg-white/30 transition-colors"
      >
        返回首页
      </Button>
    </div>
  )
}


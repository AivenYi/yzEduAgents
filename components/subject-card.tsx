import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

interface SubjectCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function SubjectCard({ icon: Icon, title, description, href }: SubjectCardProps) {
  return (
    <Link 
      href={href}
      className="block p-6 rounded-2xl bg-white/10 backdrop-blur-sm 
        hover:bg-white/20 transition-all duration-200
        hover:scale-105 active:scale-95"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </Link>
  )
}


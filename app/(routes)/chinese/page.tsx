import { BookOpen, PenTool, Type, MessageCircle } from 'lucide-react'
import { SubjectCard } from '@/components/subject-card'

const chineseFeatures = [
  {
    icon: BookOpen,
    title: '阅读理解',
    description: '文章阅读与赏析',
    href: '/chinese/reading'
  },
  {
    icon: PenTool,
    title: '写作',
    description: '作文与创作指导',
    href: '/chinese/writing'
  },
  {
    icon: Type,
    title: '语法',
    description: '语言知识与运用',
    href: '/chinese/grammar'
  },
  {
    icon: MessageCircle,
    title: '口语表达',
    description: '演讲与口头表达',
    href: '/chinese/speaking'
  }
]

export default function ChinesePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">语文</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chineseFeatures.map((feature) => (
            <SubjectCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


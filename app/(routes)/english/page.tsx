import { Headphones, MessageSquare, BookOpen, BookMarked } from 'lucide-react'
import { SubjectCard } from '@/components/subject-card'

const englishFeatures = [
  {
    icon: Headphones,
    title: '听力训练',
    description: '英语听力练习',
    href: '/english/listening'
  },
  {
    icon: MessageSquare,
    title: '口语对话',
    description: '英语口语练习',
    href: '/english/speaking'
  },
  {
    icon: BookOpen,
    title: '阅读理解',
    description: '英语阅读与理解',
    href: '/english/reading'
  },
  {
    icon: BookMarked,
    title: '词汇学习',
    description: '单词与短语',
    href: '/english/vocabulary'
  }
]

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">英语</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {englishFeatures.map((feature) => (
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


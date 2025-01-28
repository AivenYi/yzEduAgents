import { Brain, Target, Route, Notebook } from 'lucide-react'
import { SubjectCard } from '@/components/subject-card'

const diagnosticFeatures = [
  {
    icon: Brain,
    title: '学习诊断',
    description: '全面分析学习情况',
    href: '/diagnostic/learning'
  },
  {
    icon: Target,
    title: '能力评估',
    description: '测试当前学习水平',
    href: '/diagnostic/ability'
  },
  {
    icon: Route,
    title: '学习规划',
    description: '制定个性化学习计划',
    href: '/diagnostic/plan'
  },
  {
    icon: Notebook,
    title: '课程推荐',
    description: '智能推荐适合的课程',
    href: '/diagnostic/courses'
  }
]

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">诊断规划</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diagnosticFeatures.map((feature) => (
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


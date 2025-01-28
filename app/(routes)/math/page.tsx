import { ActivityIcon as Function, Triangle, PieChart, Calculator } from 'lucide-react'
import { SubjectCard } from '@/components/subject-card'

const mathFeatures = [
  {
    icon: Function,
    title: '代数',
    description: '方程式与函数',
    href: '/math/algebra'
  },
  {
    icon: Triangle,
    title: '几何',
    description: '平面与空间图形',
    href: '/math/geometry'
  },
  {
    icon: PieChart,
    title: '统计',
    description: '数据分析与概率',
    href: '/math/statistics'
  },
  {
    icon: Calculator,
    title: '计算练习',
    description: '基础运算技能',
    href: '/math/calculation'
  }
]

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">数学</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mathFeatures.map((feature) => (
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


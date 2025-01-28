import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/nav-bar'

const features = [
  { name: '视频答疑', views: '2.2亿', href: '/video', color: 'bg-blue-500/80' },
  { name: '作业批改', href: '/homework', color: 'bg-blue-600/80' },
  { name: '看笔记', href: '/notes', color: 'bg-blue-400/80' },
  { name: '单词本', href: '/vocabulary', color: 'bg-amber-500/80' },
  { name: '查翻译', href: '/translate', color: 'bg-rose-400/80' },
]

const bottomFeatures = [
  { name: '同步课', href: '/sync', icon: '▶️' },
  { name: '全科错题本', href: '/mistakes', icon: '❌' },
  { name: '真题试卷', href: '/exam', icon: '📝' },
  { name: '应用商店', href: '/store', icon: '🏪' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-indigo-800">
      {/* Navigation */}
      <nav className="p-4">
        <div className="flex items-center justify-start gap-6 md:gap-8 overflow-x-auto whitespace-nowrap px-4 md:px-8">
          {['诊断规划', 'AI数学老师', 'AI语文老师', 'AI英语老师'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-white text-sm md:text-base font-medium hover:opacity-80 transition-opacity"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-8 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">
          作业辅导
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12">
          {/* Left Side - Character */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="relative w-64 md:w-80 lg:w-full max-w-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cb0b6983e6d4ab995400d7515e5f917-TiWn7SjMVjN0YaqNxkGk3YyXTZOrV5.png"
                alt="AI Education Assistant"
                width={400}
                height={400}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Features Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className={`${feature.color} rounded-2xl p-6 text-white shadow-lg 
                    backdrop-blur-sm transition-all duration-200 
                    hover:scale-105 active:scale-95
                    flex flex-col items-center justify-center gap-2
                    aspect-[4/3] md:aspect-[3/2]`}
                >
                  <span className="text-lg md:text-xl font-medium">{feature.name}</span>
                  {feature.views && (
                    <span className="text-sm md:text-base opacity-80">{feature.views}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-400/90 to-indigo-800/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-around md:justify-center md:gap-16 lg:gap-24">
              {bottomFeatures.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="flex flex-col items-center gap-2 text-white 
                    transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <span className="text-xl md:text-2xl">{feature.icon}</span>
                  <span className="text-xs md:text-sm whitespace-nowrap">{feature.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


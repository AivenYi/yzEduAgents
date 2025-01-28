import Link from 'next/link'

const navItems = [
  { title: '听力训练', href: '/english/listening' },
  { title: '口语对话', href: '/english/speaking' },
  { title: '阅读理解', href: '/english/reading' },
  { title: '词汇学习', href: '/english/vocabulary' }
]

export default function EnglishLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800">
      <nav className="bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-8 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
} 
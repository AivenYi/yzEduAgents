'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: '诊断规划', href: '/diagnostic' },
  { name: 'AI数学老师', href: '/math' },
  { name: 'AI语文老师', href: '/chinese' },
  { name: 'AI英语老师', href: '/english' },
  { name: 'AI学伴', href: '/companion' },
  { name: 'AI百科全书', href: '/encyclopedia' },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-start gap-8 px-6 py-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-white text-lg font-medium transition-all duration-200
            hover:scale-110 active:scale-95
            ${pathname === item.href ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}


interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-white/80">{description}</p>
    </div>
  )
}


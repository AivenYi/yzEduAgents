interface EncyclopediaLayoutProps {
  children: React.ReactNode;
}

export default function EncyclopediaLayout({ children }: EncyclopediaLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800">
      {children}
    </div>
  );
}

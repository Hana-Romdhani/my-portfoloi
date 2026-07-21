import React from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12">{children}</div>
    </div>
  )
}

export default DashboardLayout

export default function CaseDetailLoading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-4 w-12 bg-muted rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-40 bg-muted rounded animate-pulse" />
            <div className="h-4 w-56 bg-muted rounded animate-pulse mt-2" />
          </div>
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 h-24 bg-card border border-border rounded-xl animate-pulse" />
          <div className="h-24 bg-card border border-border rounded-xl animate-pulse" />
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-card border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PatientDetailLoading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-4 w-12 bg-muted rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-56 bg-muted rounded animate-pulse mt-2" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-muted rounded-lg animate-pulse" />
            <div className="h-8 w-20 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 bg-card border border-border rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-8 w-24 bg-muted rounded animate-pulse mb-4" />
        <div className="grid gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-20 bg-card border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

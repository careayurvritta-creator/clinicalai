export default function RootLoading() {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 bg-panel-chat border-r border-border p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading Ayurveda Clinical AI...</p>
        </div>
      </div>
    </div>
  )
}

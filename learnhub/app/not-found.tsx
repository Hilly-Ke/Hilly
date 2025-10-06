export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <a href="/" className="underline">Go back home</a>
      </div>
    </div>
  )
}



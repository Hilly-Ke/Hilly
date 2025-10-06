"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground">An unexpected error occurred. You can try again or go back home.</p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={() => reset()}>Try again</Button>
              <Button variant="outline" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
            {error?.digest && <p className="text-xs text-muted-foreground">Ref: {error.digest}</p>}
          </div>
        </div>
      </body>
    </html>
  )
}



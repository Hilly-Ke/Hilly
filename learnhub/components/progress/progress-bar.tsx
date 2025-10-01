import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

export function ProgressBar({ progress, className, showPercentage = true }: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Progress</span>
        {showPercentage && <span className="text-sm text-muted-foreground">{progress}%</span>}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

import { cn } from '@/lib/utils'
import * as React from 'react'

interface ProgressSegment {
  value: number
  color: string
  label: string
}

interface MultiSegmentProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  segments: ProgressSegment[]
  height?: number
}

const MultiSegmentProgress = React.forwardRef<
  HTMLDivElement,
  MultiSegmentProgressProps
>(({ segments, height = 24, className, ...props }, ref) => {
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className='space-y-2'>
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-full bg-secondary',
          className
        )}
        style={{ height: `${height}px` }}
        {...props}
      >
        {segments.map((segment, index) => {
          const segmentWidth = (segment.value / totalValue) * 100
          const leftPosition = segments
            .slice(0, index)
            .reduce((sum, s) => sum + (s.value / totalValue) * 100, 0)

          return (
            <div
              key={index}
              className='absolute top-0 flex h-full items-center justify-center text-xs font-bold text-primary-foreground'
              style={{
                width: `${segmentWidth}%`,
                left: `${leftPosition}%`,
                backgroundColor: segment.color
              }}
            >
              {segmentWidth > 10 && `${Math.round(segmentWidth)}%`}
            </div>
          )
        })}
      </div>
      <div className='flex justify-between text-sm text-muted-foreground'>
        {segments.map((segment, index) => (
          <div key={index} className='flex items-center'>
            <div
              className='mr-1 h-3 w-3 rounded-full'
              style={{ backgroundColor: segment.color }}
            />
            {segment.label}
          </div>
        ))}
      </div>
    </div>
  )
})
MultiSegmentProgress.displayName = 'MultiSegmentProgress'

export default function VisibleMultiSegmentProgressBar() {
  const segments: ProgressSegment[] = [
    { value: 15, color: '#3b82f6', label: 'Completed' },
    { value: 35, color: '#ef4444', label: 'In Progress' },
    { value: 25, color: '#000000', label: 'Not Started' }
  ]

  return (
    <div className='w-full max-w-md rounded-lg bg-background p-4 shadow'>
      <h2 className='mb-4 text-lg font-semibold'>Project Progress</h2>
      <MultiSegmentProgress segments={segments} />
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'

interface QuickRepliesProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export function QuickReplies({ suggestions, onSelect, className }: QuickRepliesProps) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-2 mt-2', className)}>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors text-foreground"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

interface SeverityScaleProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labels?: { min: string; max: string }
}

export function SeverityScale({ value, onChange, min = 1, max = 10, labels }: SeverityScaleProps) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>{labels?.min || 'Mild'}</span>
        <span className="font-medium text-foreground">{value}/10</span>
        <span>{labels?.max || 'Severe'}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between mt-1">
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + min)}
            className={cn(
              'w-6 h-6 text-xs rounded transition-colors',
              value === i + min
                ? 'bg-primary text-white'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {i + min}
          </button>
        ))}
      </div>
    </div>
  )
}

interface ProgressBarProps {
  current: number
  total: number
  percentage: number
  showLabel?: boolean
}

export function ProgressBar({ current, total, percentage, showLabel = true }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {percentage}%
        </span>
      )}
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  )
}

interface SelectButtonsProps {
  options: Array<{ value: string; label: string }>
  selected: string
  onSelect: (value: string) => void
  multiSelect?: boolean
  selectedMultiple?: string[]
  onMultiSelect?: (values: string[]) => void
}

export function SelectButtons({
  options,
  selected,
  onSelect,
  multiSelect = false,
  selectedMultiple = [],
  onMultiSelect,
}: SelectButtonsProps) {
  const handleSelect = (value: string) => {
    if (multiSelect && onMultiSelect) {
      if (selectedMultiple.includes(value)) {
        onMultiSelect(selectedMultiple.filter(v => v !== value))
      } else {
        onMultiSelect([...selectedMultiple, value])
      }
    } else {
      onSelect(value)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => {
        const isSelected = multiSelect
          ? selectedMultiple.includes(option.value)
          : selected === option.value

        return (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              'px-3 py-2 text-sm rounded-lg border transition-colors',
              isSelected
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-muted border-border text-foreground hover:border-primary/50'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

interface ConfirmButtonsProps {
  onConfirm: () => void
  onRefine?: () => void
  onCorrect?: (correction: string) => void
  confirmLabel?: string
  refineLabel?: string
}

export function ConfirmButtons({
  onConfirm,
  onRefine,
  onCorrect,
  confirmLabel = 'Confirm',
  refineLabel = 'Add more info',
}: ConfirmButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <button
        onClick={onConfirm}
        className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        {confirmLabel}
      </button>
      {onRefine && (
        <button
          onClick={onRefine}
          className="px-4 py-2 text-sm bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          {refineLabel}
        </button>
      )}
    </div>
  )
}
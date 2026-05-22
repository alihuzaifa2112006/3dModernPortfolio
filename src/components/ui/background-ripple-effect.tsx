import React, { useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  variant = 'default',
  fill = false,
}: {
  rows?: number
  cols?: number
  cellSize?: number
  variant?: 'default' | 'bright'
  /** When true, grid fills parent — no fixed pixel size (prevents horizontal overflow) */
  fill?: boolean
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number
    col: number
  } | null>(null)
  const [rippleKey, setRippleKey] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const isBright = variant === 'bright'

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-0 z-[1] overflow-hidden bg-[#0a0a0a]',
        isBright
          ? '[--cell-border-color:rgba(197,248,42,0.35)] [--cell-fill-color:rgba(197,248,42,0.25)] [--cell-shadow-color:rgba(0,0,0,0.3)]'
          : '[--cell-border-color:rgba(255,255,255,0.28)] [--cell-fill-color:rgba(197,248,42,0.22)] [--cell-shadow-color:rgba(0,0,0,0.3)]',
      )}
    >
      <DivGrid
        key={`base-${rippleKey}`}
        className="h-full w-full opacity-95"
        rows={rows}
        cols={cols}
        cellSize={cellSize}
        fill={fill}
        borderColor="var(--cell-border-color)"
        fillColor="var(--cell-fill-color)"
        clickedCell={clickedCell}
        onCellClick={(row, col) => {
          setClickedCell({ row, col })
          setRippleKey((k) => k + 1)
        }}
        interactive={!fill}
      />
    </div>
  )
}

type DivGridProps = {
  className?: string
  rows: number
  cols: number
  cellSize: number
  fill?: boolean
  borderColor: string
  fillColor: string
  clickedCell: { row: number; col: number } | null
  onCellClick?: (row: number, col: number) => void
  interactive?: boolean
}

type CellStyle = React.CSSProperties & {
  ['--delay']?: string
  ['--duration']?: string
}

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  fill = false,
  borderColor = '#3f3f46',
  fillColor = 'rgba(14,165,233,0.3)',
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  )

  const gridStyle: React.CSSProperties = fill
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '100%',
        height: '100%',
      }
    : {
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
        marginInline: 'auto',
      }

  return (
    <div className={cn('relative z-[3]', className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols)
        const colIdx = idx % cols
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0
        const delay = clickedCell ? Math.max(0, distance * 55) : 0
        const duration = 200 + distance * 80

        const style: CellStyle = clickedCell
          ? {
              '--delay': `${delay}ms`,
              '--duration': `${duration}ms`,
            }
          : {}

        return (
          <div
            key={idx}
            className={cn(
              'cell relative border-[0.5px] opacity-85 transition-opacity duration-150',
              clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
              !interactive && 'pointer-events-none',
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        )
      })}
    </div>
  )
}

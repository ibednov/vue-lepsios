export type ChartStrategy = 'line' | 'bar' | 'area'

export type ChartDatum = Record<string, string | number | Date | null | undefined>

export interface ChartLegendEntry {
  key?: string
  name: string
  color: string
}

export interface ChartStrategyProps {
  data: ChartDatum[]
  strategy: ChartStrategy
  xKey: string
  yKey: string
  color: string
  seriesName: string
  height?: number
  yFormat?: 'int' | 'percent'
  xTickLimit?: number
}

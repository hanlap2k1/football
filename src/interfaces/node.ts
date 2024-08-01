export interface INode {
  id: string
  sourcePosition: string
  targetPosition: string
  data: IData
  position: IPosition
}
interface IData {
  label: string
}
interface IPosition {
  x: number
  y: number
}

export interface IEdge {
  id: string
  source: string
  type: string
  target: string
  animated: boolean
}

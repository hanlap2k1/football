'use client'

import { IMatchKnockouts } from '@/interfaces/matchKnockouts'
import { IEdge, INode } from '@/interfaces/node'
import cloneDeep from 'clone-deep'


const NODE_ROOT_ID = 51
const WIDTH_NODE = 250
const HEIGHT_NODE = 100

export const callBackDataToNode = (
  data: IMatchKnockouts[],
  nodes: INode[],
  node_id: number = NODE_ROOT_ID,
  is_right: boolean = true,
  grade: number = 0,
  width: number,
  height: number,
  right: boolean
): INode[] => {
  const node = data.find((item) => item.sequenceId === node_id)
  if (!node) return nodes
  const x = right 
    ? Math.round(width / 2) + WIDTH_NODE * (grade + 1)
    : Math.round(width / 2) - WIDTH_NODE * (grade + 1)
  const y = is_right
    ? Math.round(height / 2) + HEIGHT_NODE * grade
    : Math.round(height / 2) - HEIGHT_NODE * grade
  nodes.push({
    id: node.sequenceId.toString(),
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: node.sequenceId.toString() },
    position: {
      x: cloneDeep(x),
      y: cloneDeep(y),
    },
  })
  if (node.parentAwaySequenceId) {
    callBackDataToNode(
      data,
      nodes,
      Number(node.parentAwaySequenceId),
      true,
      grade + 1,
      width,
      height,
      right
    )
  }
  if (node.parentHomeSequenceId) {
    callBackDataToNode(
      data,
      nodes,
      Number(node.parentHomeSequenceId),
      false,
      grade + 1,
      width,
      height,
      right
    )
  }
  return nodes
}

export const convertDataToNode = (
  data: IMatchKnockouts[],
  width: number,
  height: number
): INode[] => {
  const nodes: INode[] = []
  const nodeRoot = data.find((item) => item.sequenceId === NODE_ROOT_ID)
  if (nodeRoot) {
    nodes.push({
      id: nodeRoot.sequenceId.toString(),
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: nodeRoot.homeName },
      position: { x: Math.round(width / 2), y: Math.round(height / 2) },
    })
  }
  if (nodeRoot?.parentAwaySequenceId) {
    callBackDataToNode(
      data,
      nodes,
      Number(nodeRoot.parentAwaySequenceId),
      true,
      0,
      width,
      height,
      false
    )
  }
  if (nodeRoot?.parentHomeSequenceId) {
    callBackDataToNode(
      data,
      nodes,
      Number(nodeRoot.parentHomeSequenceId),
      false,
      0,
      width,
      height,
      true
    )
  }

  return nodes
}

export  const convertDataToEdge = (
  data: INode[],
  data_response: IMatchKnockouts[]
) => {
    const edges: IEdge[] = []
    data.forEach(item => {
        const edge = data_response.find((res) => 
            res.sequenceId.toString() === item.id
        )
        if(edge && edge.parentAwaySequenceId) {
            edges.push({
                id: edge.sequenceId.toString()+'-'+edge.parentAwaySequenceId.toString(),
                source: item.id,
                target: edge.parentAwaySequenceId.toString(),
                animated: true,
                type: 'smoothstep',
            })
        }
        if(edge && edge.parentHomeSequenceId) {
            edges.push({
                id: edge.sequenceId.toString()+'-'+edge.parentHomeSequenceId.toString(),
                source: item.id,
                target: edge.parentHomeSequenceId.toString(),
                animated: true,
                type: 'smoothstep',
            })
        }
    })
    return edges
  }


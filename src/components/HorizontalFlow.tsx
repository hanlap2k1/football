'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { IMatchKnockouts } from '@/interfaces/matchKnockouts'
import { useWindowSize } from 'usehooks-ts'
// import { convertDataToEdge, convertDataToNode } from '@/helper';
import { INode } from '@/interfaces/node'
import { useHookHelper } from '@/helper'
import cloneDeep from 'clone-deep'
import { CardItem } from './CardItem'
import Image from 'next/image'

interface IProps {
  data: IMatchKnockouts[]
}

const NODE_ROOT_ID = 51
const WIDTH_NODE = 250
const HEIGHT_NODE = 100
const MAX_GRADE = 3
const URL = 'https://asset.asiasport.com/'


const callBackDataToNode = (
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
  const y = !grade
    ? Math.round(height / 2)
    : is_right
    ? height - HEIGHT_NODE * (MAX_GRADE - grade)
    : height + HEIGHT_NODE * (MAX_GRADE - grade)

  let sourcePosition = 'right'
  let targetPosition = 'left'
  switch (grade) {
    case 0:
      sourcePosition = right ? 'right' : 'left'
      targetPosition = is_right ? 'right' : 'left'
      break
    case 1:
      sourcePosition = right ? 'right' : 'left'
      targetPosition = is_right ? 'bottom' : 'top'
      break
    case 2:
      targetPosition = is_right ? 'bottom' : 'top'
      sourcePosition = undefined
      break
    default:
      break
  }

  nodes.push({
    id: node.sequenceId.toString(),
    sourcePosition: sourcePosition,
    targetPosition: targetPosition,
    data: { label: <CardItem data={node} /> },
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
      cloneDeep(y),
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
      cloneDeep(y),
      right
    )
  }
  return nodes
}

const convertDataToNode = (
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
      data: { label: <CardItem data={nodeRoot} /> },
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

export const HorizontalFlow = (props: IProps) => {
  const { data } = props

  const { width, height } = useWindowSize()

  const { convertDataToEdge } = useHookHelper()

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const [champage, setChampage] = useState<IMatchKnockouts>()

  useEffect(() => {
    const nodeConvert = convertDataToNode(data, width, height)
    const edgeConvert = convertDataToEdge(nodeConvert, data)
    setNodes(nodeConvert)
    setEdges(edgeConvert)
  }, [width, height])

  useEffect(() => {
    const nodeRoot = data.find((item) => item.sequenceId === NODE_ROOT_ID)
    if (nodeRoot) setChampage(nodeRoot)
  }, [data])
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {nodes.length && (
        <div
          className={`fixed flex gap-3 flex-col items-center text-white z-50 text-center transform -translate-x-1/2 -translate-y-full`}
          style={{
            top: Math.round(height / 2) - 55 + 'px',
            left: Math.round(width / 2) + 'px',
          }}
        >
          <p className="header">
            UEFA Euro 2024 <br /> Tỷ số trực tiếp
          </p>
          <p className="italic text-xl">Vô địch</p>
          <p className="flex justify-start gap-2 w-32 px-4 py-2 bg-slate-500 text-white rounded-lg border-none text-sm">
            
              <Image
                src={`${URL}${champage?.homeLogo}`} 
                alt={champage?.homeName}
                width={20}
                height={20}
              />
            {champage?.homeName || ''}
          </p>
          <p className="italic text-2xl">Vòng chung kết</p>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        //   onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </div>
  )
}

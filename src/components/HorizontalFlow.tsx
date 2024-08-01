'use client'
import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { IMatchKnockouts } from "@/interfaces/matchKnockouts"
import { useWindowSize } from 'usehooks-ts';
import { convertDataToEdge, convertDataToNode } from '@/helper';
import { INode } from '@/interfaces/node';

interface IProps{
  data:IMatchKnockouts[]
}




const initialEdges = [
  {
    id: 'horizontal-e1-2',
    source: '51',
    type: 'smoothstep',
    target: '49',
    animated: true,
  },
  {
    id: 'horizontal-e1-3',
    source: '51',
    type: 'smoothstep',
    target: '50',
    animated: true,
  },
  {
    id: 'horizontal-e1-4',
    source: 'horizontal-4',
    type: 'smoothstep',
    target: 'horizontal-1',
    animated: true,
  },
  {
    id: 'horizontal-e3-5',
    source: 'horizontal-5',
    type: 'smoothstep',
    target: 'horizontal-1',
    animated: true,
  }
];

export const HorizontalFlow = (props:IProps) => {
  const {data} = props
  
  const { width, height } = useWindowSize()

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  useEffect(() => {
    const nodeConvert = convertDataToNode(data, width, height)
    const edgeConvert = convertDataToEdge(nodeConvert, data)
     setNodes(nodeConvert)
    //  setEdges(edgeConvert)
  },[width,height])
  return (
    <div style={{
      height: '90vh',
      width: '90vw',
    }}>
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
  );
};

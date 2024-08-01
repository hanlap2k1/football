
import { IMatchKnockouts } from '@/interfaces/matchKnockouts'
import { IEdge, INode } from '@/interfaces/node'
export const useHookHelper = () => {


  // const callBackDataToNode = (
  //   data: IMatchKnockouts[],
  //   nodes: INode[],
  //   node_id: number = NODE_ROOT_ID,
  //   is_right: boolean = true,
  //   grade: number = 0,
  //   width: number,
  //   height: number,
  //   right: boolean
  // ): INode[] => {
  //   const node = data.find((item) => item.sequenceId === node_id)
  //   if (!node) return nodes
  //   const x = right
  //     ? Math.round(width / 2) + WIDTH_NODE * (grade + 1)
  //     : Math.round(width / 2) - WIDTH_NODE * (grade + 1)
  //   const y = !grade
  //     ? Math.round(height / 2)
  //     : is_right
  //     ? height - HEIGHT_NODE * (MAX_GRADE - grade)
  //     : height + HEIGHT_NODE * (MAX_GRADE - grade)
  
  //   let sourcePosition = 'right'
  //   let targetPosition = 'left'
  //   switch (grade) {
  //     case 0:
  //       sourcePosition = right ? 'right' : 'left'
  //       targetPosition = is_right ? 'right' : 'left'
  //       break
  //     case 1:
  //       sourcePosition = right ? 'right' : 'left'
  //       targetPosition = is_right ? 'bottom' : 'top'
  //       break
  //     case 2:
  //       targetPosition = is_right ? 'bottom' : 'top'
  //       sourcePosition = undefined
  //       break
  //     default:
  //       break
  //   }
  
  //   nodes.push({
  //     id: node.sequenceId.toString(),
  //     sourcePosition: sourcePosition,
  //     targetPosition: targetPosition,
  //     data: { label: '1' },
  //     position: {
  //       x: cloneDeep(x),
  //       y: cloneDeep(y),
  //     },
  //   })
  //   if (node.parentAwaySequenceId) {
  //     callBackDataToNode(
  //       data,
  //       nodes,
  //       Number(node.parentAwaySequenceId),
  //       true,
  //       grade + 1,
  //       width,
  //       cloneDeep(y),
  //       right
  //     )
  //   }
  //   if (node.parentHomeSequenceId) {
  //     callBackDataToNode(
  //       data,
  //       nodes,
  //       Number(node.parentHomeSequenceId),
  //       false,
  //       grade + 1,
  //       width,
  //       cloneDeep(y),
  //       right
  //     )
  //   }
  //   return nodes
  // }
  
  
  
  const convertDataToEdge = (
    data: INode[],
    data_response: IMatchKnockouts[]
  ) => {
    const edges: IEdge[] = []
    data.forEach((item) => {
      const edge = data_response.find(
        (res) => res.sequenceId.toString() === item.id
      )
      if (edge && edge.parentAwaySequenceId) {
        edges.push({
          id:
            edge.sequenceId.toString() +
            '-' +
            edge.parentAwaySequenceId.toString(),
          source: item.id,
          target: edge.parentAwaySequenceId.toString(),
          animated: true,
          type: 'smoothstep',
        })
      }
      if (edge && edge.parentHomeSequenceId) {
        edges.push({
          id:
            edge.sequenceId.toString() +
            '-' +
            edge.parentHomeSequenceId.toString(),
          source: item.id,
          target: edge.parentHomeSequenceId.toString(),
          animated: true,
          type: 'smoothstep',
        })
      }
    })
    return edges
  }
  return {
    convertDataToEdge
  }
}

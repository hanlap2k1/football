
import { IMatchKnockouts } from '@/interfaces/matchKnockouts'
import { IEdge, INode } from '@/interfaces/node'
export const useHookHelper = () => {
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

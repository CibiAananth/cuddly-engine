/** @format */
import { useCallback } from 'react';
import { useReactFlow, getConnectedEdges } from 'reactflow';

export const useValidatorFn = () => {
  const { getNode, getEdges } = useReactFlow();

  return useCallback(
    connection => {
      const edges = getConnectedEdges([getNode(connection.source)], getEdges());
      if (!edges.length) return true;

      let connectedCount = 0;
      edges.forEach(edge => {
        if (edge.source === connection.source) {
          connectedCount++;
        }
      });

      return !connectedCount;
    },
    [getNode, getEdges],
  );
};

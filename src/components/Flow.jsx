/** @format */

import { useCallback, useRef } from 'react';

// external dependencies
import ReactFlow, {
  Controls,
  applyNodeChanges,
  useReactFlow,
  addEdge,
} from 'reactflow';

// utils
import { useEdgeStore, useNodeStore } from '@/hooks/useStore';
import { DATA_TRANSFER_MIME_TYPE } from '@/constants/utils';

// components
import { createNode } from '@/components/Nodes/nodeFactory';
import MessageNode, {
  MESSAGE_NODE_IDENTIFIER,
} from '@/components/Nodes/MessageNode';
import SelectNode, {
  SELECT_NODE_IDENTIFIER,
} from '@/components/Nodes/SelectNode';

// constants
const flowViewSettings = {
  snapGrid: [20, 20],
  defaultViewport: { x: 0, y: 0, zoom: 1.5 },
  attributionPosition: 'bottom-left',
  fitView: true,
  snapToGrid: true,
};

// node types
const nodeTypes = {
  [MESSAGE_NODE_IDENTIFIER]: MessageNode,
  [SELECT_NODE_IDENTIFIER]: SelectNode,
};

export default function Flow() {
  // refs
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useReactFlow();

  // node store
  const nodesFromStore = useNodeStore(state => state.nodes);
  const addNode = useNodeStore(state => state.addNode);
  const setNodes = useNodeStore(state => state.setNodes);
  const setSelectedNode = useNodeStore(state => state.setSelectedNode);

  // edge store
  const edgesFromStore = useEdgeStore(state => state.edges);
  const setEdges = useEdgeStore(state => state.setEdges);

  /**
   * @param {object[]} nodes
   * @description
   * Applies changes to nodes and update the nodes in the store.
   * @see https://reactflow.dev/docs/api/react-flow-props/#onnodeschange
   * @see https://reactflow.dev/docs/api/graph-util-functions/#applynodechanges
   * @see https://reactflow.dev/docs/api/hooks/use-nodes-state/
   */
  const onNodesChange = useCallback(
    changes => {
      const updates = applyNodeChanges(changes, nodesFromStore);
      setNodes(updates);
    },
    [nodesFromStore, setNodes],
  );

  /**
   * @param {object[]} edges
   * @description
   * Applies changes to edges and update the edges in the store.
   * @see https://reactflow.dev/docs/api/react-flow-props/#onedgeschange-2
   * @see https://reactflow.dev/docs/api/graph-util-functions/#applyedgechanges
   * @see https://reactflow.dev/docs/api/hooks/use-edges-state/
   */
  const onEdgesChange = useCallback(
    changes => {
      const updates = applyNodeChanges(changes, edgesFromStore);
      setEdges(updates);
    },
    [edgesFromStore, setEdges],
  );

  /**
   * @param {object} event
   * @description
   * Prevents the default behavior of the browser when dragging over the flow.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drag_effects
   */
  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  /**
   * @param {object} event
   * @description
   * Prevents the default behavior of the browser when dropping over the flow.
   */

  const onDrop = useCallback(
    event => {
      event.preventDefault();

      // check if the dropped element is valid
      const nodeType = event.dataTransfer.getData(DATA_TRANSFER_MIME_TYPE);
      if (typeof nodeType === 'undefined' || !nodeType) {
        return;
      }

      // get the position of the drop
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // create a new node and add it to the store
      const newNode = createNode(nodeType, position);
      addNode(newNode);
    },
    [reactFlowInstance, addNode],
  );

  /**
   * @param {array} nodes
   * @description
   * Sets the first selected node in the store.
   */
  const onSelectionChange = useCallback(
    ({ nodes }) => {
      if (nodes.length) {
        setSelectedNode(nodes[0]);
      }
    },
    [setSelectedNode],
  );

  /**
   * @param {object} params
   * @description
   * Adds an edge to the store.
   * @see https://reactflow.dev/docs/api/react-flow-props/#onconnect-1
   * @see https://reactflow.dev/docs/api/graph-util-functions/#addedge
   */
  const onConnect = useCallback(
    params => {
      setEdges(addEdge(params, edgesFromStore));
    },
    [setEdges, edgesFromStore],
  );

  /**
   * @description
   * Sets the selected node to null.
   * This is used to unselect a node in the store when the user deletes the selected node.
   */
  const onNodesDelete = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <ReactFlow
      ref={reactFlowWrapper}
      nodeTypes={nodeTypes}
      nodes={nodesFromStore}
      edges={edgesFromStore}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onSelectionChange={onSelectionChange}
      selectNodesOnDrag={false}
      {...flowViewSettings}
    >
      <Controls />
    </ReactFlow>
  );
}

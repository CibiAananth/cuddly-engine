/** @format */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useNodeStore = create(
  immer(set => ({
    nodes: [],
    selectedNode: null,
    addNode(node) {
      set(state => {
        state.nodes.push(node);
      });
    },
    setNodes(nodes) {
      set(state => {
        state.nodes = nodes;
      });
    },
    updateNode(id, value) {
      set(state => {
        const index = state.nodes.findIndex(n => n.id === id);
        state.nodes[index] = { ...state.nodes[index], ...value };
      });
    },
    setSelectedNode(node) {
      set(state => {
        state.selectedNode = node;
      });
    },
    clearNodeSelection(id) {
      set(state => {
        const index = state.nodes.findIndex(n => n.id === id);
        state.nodes[index].selected = false;
        state.selectedNode = null;
      });
    },
  })),
);

export const useEdgeStore = create(
  immer(set => ({
    edges: [],
    setEdges: edges => {
      set(state => {
        state.edges = edges;
      });
    },
  })),
);

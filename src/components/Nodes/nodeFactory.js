/** @format */

// components
import {
  MessageNodeSettings,
  MESSAGE_NODE_IDENTIFIER,
} from '@/components/Nodes/MessageNode';
import {
  SelectNodeSettings,
  SELECT_NODE_IDENTIFIER,
} from '@/components/Nodes/SelectNode';

/**
 * @param {string} identifier
 * @param {function} settings
 * @param {function} dataComposer
 * @returns {function}
 * @description
 * Factory function for creating nodes.
 * @example
 * const messageNodeFactory = nodeFactory(
 *  MESSAGE_NODE_IDENTIFIER,
 *  MessageNodeSettings,
 *  nodeId => ({ message: `Default message for ${nodeId}` }),
 * );
 */
const nodeFactory = (identifier, settings, dataComposer) => {
  // node defaults
  const defaults = {
    draggable: true,
    selectable: true,
  };

  // node id generator
  let id = 1;
  const getNodeId = () => `${identifier}_${id++}`;

  // node creator
  return position => {
    const nodeId = getNodeId();
    return {
      ...defaults,
      id: nodeId,
      type: identifier,
      position,
      data: dataComposer(nodeId),
      settingsRenderer: settings.bind(null, { nodeId }), // bind nodeId to settings renderer for easy access
    };
  };
};

// node factories
const messageNodeFactory = nodeFactory(
  MESSAGE_NODE_IDENTIFIER,
  MessageNodeSettings,
  nodeId => ({ message: `Default message for ${nodeId}` }),
);

const selectNodeFactory = nodeFactory(
  SELECT_NODE_IDENTIFIER,
  SelectNodeSettings,
  () => ({ item: null }),
);

const nodeCreator = {
  [MESSAGE_NODE_IDENTIFIER]: messageNodeFactory,
  [SELECT_NODE_IDENTIFIER]: selectNodeFactory,
};

export function createNode(type, position) {
  if (!type) {
    throw new Error('Node type is required');
  }
  if (!position) {
    throw new Error('Node position is required');
  }

  if (!nodeCreator[type]) {
    throw new Error(`Node type: ${type} is not supported`);
  }

  return nodeCreator[type](position);
}

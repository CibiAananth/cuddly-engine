/** @format */

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
export const nodeFactory = (identifier, settings, dataComposer) => {
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

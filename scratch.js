/** @format */

function onNodesChange(changes) {
  const updater = changes.reduce((acc, change) => {
    if (change.type === 'position' && change.dragging) {
      acc.push({
        ...nodesFromStore[change.id],
        position: change.position,
      });
    }
    return acc;
  }, []);
  if (updater.length) updateNodes(updater);
}

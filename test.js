const pathNodes = (addedToQueueBy, destinationNode) => {
  const path = [];
  let currentNode = destinationNode;

  while (currentNode !== undefined) {
    path.unshift(currentNode);
    currentNode = addedToQueueBy[currentNode];
  }

  return path;
};

const toStepWisePath = (path) => {
  const stepWisePath = [];
  for (let i = 0; i < path.length - 1; i++) {
    const [x1, y1] = path[i].split("-").map(Number);
    const [x2, y2] = path[i + 1].split("-").map(Number);
    stepWisePath.push({ from: { x: x1, y: y1 }, to: { x: x2, y: y2 } });
  }
  return stepWisePath;
};
const manhattanDistance = (point1, point2) => {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
};

const MSMD_ASTAR = (graphNodes, sources, destinations) => {
  return new Promise((resolve, reject) => {
    const destinationSet = new Set(
      destinations.map((dest) => `${dest.x}-${dest.y}`)
    );
    const startNodes = sources.map((start) => `${start.x}-${start.y}`);

    const getNeighborsWithDistance = (node, costSoFar) => {
      const neighbors = graphNodes[node];
      const neighborsWithDistance = neighbors.map((neighbor) => {
        return {
          node: neighbor,
          costSoFar: costSoFar + 1,
          heuristicValue: nearestDestinationDistance(neighbor, destinationSet),
        };
      });
      return neighborsWithDistance;
    };

    const visited = new Set();
    startNodes.forEach((node) => visited.add(node));

    const priorityQueue = [];
    startNodes.forEach((node) => {
      priorityQueue.push({
        node,
        costSoFar: 0,
        heuristicValue: nearestDestinationDistance(node, destinationSet),
      });
    });

    const addedToQueueBy = {};
    const stepWiseVisited = [];

    while (priorityQueue.length > 0) {
      priorityQueue.sort(
        (a, b) =>
          a.costSoFar + a.heuristicValue - (b.costSoFar + b.heuristicValue)
      );
      const { node, costSoFar } = priorityQueue.shift();
      stepWiseVisited.push([...visited]);

      if (destinationSet.has(node)) {
        const pathTaken = pathNodes(addedToQueueBy, node);
        resolve({
          pathExists: true,
          pathTaken,
          visited,
          stepWiseVisited,
          stepWisePath: toStepWisePath(pathTaken),
        });
        return;
      }

      const neighborsWithDistance = getNeighborsWithDistance(node, costSoFar);
      for (let neighbor of neighborsWithDistance) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          addedToQueueBy[neighbor.node] = node;
          priorityQueue.push(neighbor);
        }
      }
    }
    resolve({ pathExists: false, addedToQueueBy, visited, stepWiseVisited });
    return;
  });
};

const nearestDestinationDistance = (node, destinationSet) => {
  // Calculate the Manhattan distance to the nearest destination
  let minDistance = Infinity;
  for (const dest of destinationSet) {
    const [destX, destY] = dest.split("-").map(Number);
    const [nodeX, nodeY] = node.split("-").map(Number);
    const distance = manhattanDistance(
      { x: nodeX, y: nodeY },
      { x: destX, y: destY }
    );
    if (distance < minDistance) {
      minDistance = distance;
    }
  }
  return minDistance;
};

const graphNodes = {
  "0-0": ["1-0", "0-1"],
  "1-0": ["0-0", "1-1", "2-0"],
  "0-1": ["0-0", "1-1"],
  "1-1": ["0-1", "1-0", "2-1"],
  "2-0": ["1-0", "2-1"],
  "2-1": ["2-0", "1-1"],
};

const sources = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
];
const destinations = [
  { x: 2, y: 1 },
  { x: 0, y: 1 },
];

MSMD_ASTAR(graphNodes, sources, destinations)
  .then((result) => {
    console.log(result);
    console.log("🚀 ~ .then ~ result:", result.stepWisePath.to);
  })
  .catch((error) => {
    console.error(error);
  });

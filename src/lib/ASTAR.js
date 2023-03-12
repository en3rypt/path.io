const pathNodes = (atqb, endNode) => {
    const nodesToColor = [];
    const endNodeString = `${endNode.x}-${endNode.y}`;
    let currentNode = endNodeString;
    while (currentNode) {
        nodesToColor.unshift(currentNode);
        currentNode = atqb[currentNode];
    }
    return nodesToColor;
}

const toStepWisePath = (pathTaken) => {
    const stepWisePath = [];
    for (let i = 0; i < pathTaken.length; i++) {
        const step = pathTaken.slice(0, i + 1);
        stepWisePath.push(step);
    }
    return stepWisePath;
}

const ASTAR = (graphNodes, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;

    const manhattanDistance = (node1, node2) => {
        const [x1, y1] = node1.split('-').map(Number);
        const [x2, y2] = node2.split('-').map(Number);
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    // Manhattan distance for all the neighbors
    const getNeighborsWithDistance = (node) => {
        const neighbors = graphNodes[node];
        const neighborsWithDistance = neighbors.map(neighbor => {
            return {
                node: neighbor,
                heuristicValue: manhattanDistance(neighbor, endString)
            }
        });
        return neighborsWithDistance;
    }

    const visited = new Set();
    visited.add(startString);

    const priorityQueue = [];
    priorityQueue.push({
        node: startString,
        heuristicValue: manhattanDistance(startString, endString)
    });

    const addedToQueueBy = {};
    const stepWiseVisited = [];

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.heuristicValue - b.heuristicValue);
        const { node } = priorityQueue.shift();

        if (node === endString) {
            const pathTaken = pathNodes(addedToQueueBy, end);
            return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
        }

        const neighborsWithDistance = getNeighborsWithDistance(node);
        for (let neighbor of neighborsWithDistance) {
            if (!visited.has(neighbor.node)) {
                visited.add(neighbor.node);
                addedToQueueBy[neighbor.node] = node;
                priorityQueue.push(neighbor);
            }
        }
        stepWiseVisited.push([...visited]);
    }
    return { pathExists: false, addedToQueueBy, visited, stepWiseVisited };
}

export default ASTAR;
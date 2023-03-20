import { pathNodes, toStepWisePath, manhattanDistance } from "./helper";

const GBFS = (graphNodes, start, end) => {
    return new Promise((resolve, reject) => {
        const startString = `${start.x}-${start.y}`;
        const endString = `${end.x}-${end.y}`;



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
                resolve({ pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) });
                return;
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
        resolve({ pathExists: false, addedToQueueBy, visited, stepWiseVisited });
        return;
    });
}

export default GBFS;
const pathNodes = (atqb, endNode) => {
    const nodesToColor = [];
    const endNodeString = `${endNode.x}-${endNode.y}`;
    let currentNode = endNodeString;
    while (currentNode) {
        // nodesToColor.unshift(currentNode);
        nodesToColor.push(currentNode);
        currentNode = atqb[currentNode];
    }
    return nodesToColor;
}

// convert path to stepWisePath
const toStepWisePath = (pathTaken) => {
    const stepWisePath = [];
    for (let i = 0; i < pathTaken.length; i++) {
        const step = pathTaken.slice(0, i + 1);
        stepWisePath.push(step);
    }
    return stepWisePath;
}

const BFS = (graphNodes, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const stepWiseVisited = [];
    const queue = [startString];
    const addedToQueueBy = {};
    const visited = new Set();
    visited.add(startString);

    while (queue.length > 0) {
        const node = queue.shift();
        const neighbors = graphNodes[node];

        for (let neighbor of neighbors) {

            if (neighbor === endString) {
                addedToQueueBy[neighbor] = node;
                visited.add(neighbor);
                stepWiseVisited.push([...visited]);
                const pathTaken = pathNodes(addedToQueueBy, end);

                return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                addedToQueueBy[neighbor] = node;
                queue.push(neighbor);
            }
        }
        stepWiseVisited.push([...visited]);
    }

    return { pathExists: false, addedToQueueBy, visited, stepWiseVisited };
};




export default BFS;
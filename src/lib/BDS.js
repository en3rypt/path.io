// Bidirectional Search
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

const BDS = (graphNodes, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const stepWiseVisited = [];
    const queue = [startString];
    const addedToQueueBy = {};
    const visited = new Set();

    const queue2 = [endString];
    const addedToQueueBy2 = {};
    const visited2 = new Set();


    while (queue.length > 0 && queue2.length > 0) {

        const node = queue.shift();
        const neighbors = graphNodes[node];

        for (let neighbor of neighbors) {

            if (visited2.has(neighbor)) {
                visited.add(neighbor);
                addedToQueueBy[neighbor] = node;
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

        const node2 = queue2.shift();
        const neighbors2 = graphNodes[node2];

        for (let neighbor2 of neighbors2) {

            if (visited.has(neighbor2)) {
                visited2.add(neighbor2);
                addedToQueueBy2[neighbor2] = node2;
                stepWiseVisited.push([...visited2]);
                const pathTaken = pathNodes(addedToQueueBy2, end);

                return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
            }

            if (!visited2.has(neighbor2)) {
                visited2.add(neighbor2);
                addedToQueueBy2[neighbor2] = node2;
                queue2.push(neighbor2);
            }
        }
        stepWiseVisited.push([...visited2]);
    }

    return { pathExists: false, addedToQueueBy, visited, stepWiseVisited };
};

export default BDS;
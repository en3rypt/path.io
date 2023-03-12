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

const getMeetingNode = (atqb, atqb2) => {
    const visited = new Set();
    let currentNode = atqb[endString];
    while (currentNode) {
        visited.add(currentNode);
        currentNode = atqb[currentNode];
    }
    currentNode = atqb2[startString];
    while (currentNode) {
        if (visited.has(currentNode)) {
            return currentNode;
        }
        currentNode = atqb2[currentNode];
    }
}


// convert path from mid to stepWisePath
const toStepWisePath = (pathTaken, pathTaken2) => {
    const stepWisePath = [];
    for (let i = 0; i < pathTaken.length; i++) {
        const step = pathTaken.slice(0, i + 1);
        stepWisePath.push(step);
    }
    for (let i = pathTaken2.length - 1; i >= 0; i--) {
        const step = pathTaken2.slice(i);
        stepWisePath.push(step);
    }
    return stepWisePath;
}

const BDS = (graphNodes, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const stepWiseVisited = [];
    const queue = [startString];
    const queue2 = [endString];
    const addedToQueueBy = {};
    const addedToQueueBy2 = {};
    const visited = new Set();
    const visited2 = new Set();
    visited.add(startString);
    visited2.add(endString);

    while (queue.length > 0 && queue2.length > 0) {
        const node = queue.shift();
        const node2 = queue2.shift();
        const neighbors = graphNodes[node];
        const neighbors2 = graphNodes[node2];

        for (let neighbor of neighbors) {

            if (visited2.has(neighbor)) {
                addedToQueueBy[neighbor] = node;
                visited.add(neighbor);
                stepWiseVisited.push([...visited]);
                const meetingNode = getMeetingNode(addedToQueueBy, addedToQueueBy2);
                const pathTaken = pathNodes(addedToQueueBy, meetingNode);
                const pathTaken2 = pathNodes(addedToQueueBy2, meetingNode);
                return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken, pathTaken2) };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                addedToQueueBy[neighbor] = node;
                queue.push(neighbor);
            }
        }
        for (let neighbor of neighbors2) {

            if (visited.has(neighbor)) {
                addedToQueueBy2[neighbor] = node2;
                visited2.add(neighbor);
                stepWiseVisited.push([...visited2]);
                const meetingNode = getMeetingNode(addedToQueueBy, addedToQueueBy2);
                const pathTaken = pathNodes(addedToQueueBy, meetingNode);
                const pathTaken2 = pathNodes(addedToQueueBy2, meetingNode);
                return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken, pathTaken2) };
            }

            if (!visited2.has(neighbor)) {
                visited2.add(neighbor);
                addedToQueueBy2[neighbor] = node2;
                queue2.push(neighbor);
            }
        }
        stepWiseVisited.push([...visited]);
        stepWiseVisited.push([...visited2]);
    }

    return { pathExists: false, addedToQueueBy, visited, stepWiseVisited };

}

export default BDS;
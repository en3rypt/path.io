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


const DFS = (graphNodes, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const stepWiseVisited = [];
    const stack = [startString];
    const addedToStackBy = {};
    const visited = new Set();
    visited.add(startString);

    while (stack.length > 0) {
        const node = stack.pop();
        const neighbors = graphNodes[node];

        for (let neighbor of neighbors) {

            if (neighbor === endString) {
                addedToStackBy[neighbor] = node;
                visited.add(neighbor);
                stepWiseVisited.push([...visited]);
                const pathTaken = pathNodes(addedToStackBy, end);

                return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                addedToStackBy[neighbor] = node;
                stack.push(neighbor);
            }
        }
        stepWiseVisited.push([...visited]);
    }
};


export default DFS;
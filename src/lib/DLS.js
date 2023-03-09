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


const DLS = (graphNodes, start, goal, limit) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${goal.x}-${goal.y}`;
    const stepWiseVisited = [];
    const stack = [{ node: startString, path: [startString] }];
    const addedToStackBy = {};
    const visited = new Set();
    visited.add(startString);

    while (stack.length > 0) {
        const { node, path } = stack.pop();
        const neighbors = graphNodes[node];

        for (let neighbor of neighbors) {
            if (neighbor === endString) {
                addedToStackBy[neighbor] = node;
                visited.add(neighbor);
                stepWiseVisited.push([...visited]);
                const pathTaken = pathNodes(addedToStackBy, goal);
                return { pathExists: true, path: [...path, neighbor], visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
            }

            if (!visited.has(neighbor) && path.length < limit) {
                visited.add(neighbor);
                addedToStackBy[neighbor] = node;
                stack.push({ node: neighbor, path: [...path, neighbor] });
            }
        }
        stepWiseVisited.push([...visited]);
    }

    return { pathExists: false, path: [], visited, stepWiseVisited, stepWisePath: [] };
};

export default DLS;
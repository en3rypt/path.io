const pathNodes = (atqb, endNode) => {
    const nodesToColor = [];
    const endNodeString = `${endNode.x}-${endNode.y}`;
    let currentNode = endNodeString;
    while (currentNode) {
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

const DLS = (graphNodes, start, end, limit) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const stepWiseVisited = [];
    const stack = [{ node: startString, path: [startString] }];
    const addedToStackBy = {};
    const visited = new Set();

    stepWiseVisited.push([...visited]);

    while (stack.length > 0) {
        const { node, path } = stack.pop();
        if (visited.has(node)) continue;
        visited.add(node);
        stepWiseVisited.push([...visited]);

        if (node === endString) {
            const pathTaken = pathNodes(addedToStackBy, end);
            return { pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) };
        }

        const neighbors = graphNodes[node];
        for (let neighbor of neighbors) {

            if (!visited.has(neighbor) && path.length < limit) {
                addedToStackBy[neighbor] = node;
                stack.push({ node: neighbor, path: [...path, neighbor] });
            }
        }
    }
    return { pathExists: false, pathTaken: [], visited, stepWiseVisited, stepWisePath: [] };
};


const IDDFS = (graphNodes, start, end, maxDepth) => {
    return new Promise((resolve, reject) => {
        const stepWiseVisited = [];
        for (let depth = 0; depth <= maxDepth; depth++) {
            const result = DLS(graphNodes, start, end, depth);

            if (result.stepWiseVisited[depth] === undefined) {
                result.stepWiseVisited = stepWiseVisited;
                resolve(result);
                return;
            }

            stepWiseVisited.push(...result.stepWiseVisited);
            result.stepWiseVisited = stepWiseVisited;

            if (result.pathExists) {
                resolve(result);
                return;
            }

        }
        resolve({ pathExists: false, pathTaken: [], visited: new Set(), stepWiseVisited: [], stepWisePath: [] });
        return;
    });
};

export default IDDFS;

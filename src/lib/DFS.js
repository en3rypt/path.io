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


const DFS = (graphNodes, start, end) => {
    return new Promise((resolve, reject) => {
        const startString = `${start.x}-${start.y}`;
        const endString = `${end.x}-${end.y}`;
        const stepWiseVisited = [];
        const stack = [startString];
        const addedToStackBy = {};
        const visited = new Set();

        stepWiseVisited.push([...visited]);

        while (stack.length > 0) {
            const node = stack.pop();
            if (visited.has(node)) continue;
            visited.add(node);
            stepWiseVisited.push([...visited]);

            if (node === endString) {
                const pathTaken = pathNodes(addedToStackBy, end);
                resolve({ pathExists: true, pathTaken, visited, stepWiseVisited, stepWisePath: toStepWisePath(pathTaken) });
                console.log("pathTaken", pathTaken);
                return;
            }

            const neighbors = graphNodes[node];
            for (let neighbor of neighbors) {

                if (!visited.has(neighbor)) {
                    addedToStackBy[neighbor] = node;
                    stack.push(neighbor);
                }
            }
        }
        resolve({ pathExists: false, pathTaken: [], visited, stepWiseVisited, stepWisePath: [] });
        return;
    });
};


export default DFS;
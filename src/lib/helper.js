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
const manhattanDistance = (node1, node2) => {
    const [x1, y1] = node1.split('-').map(Number);
    const [x2, y2] = node2.split('-').map(Number);
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export { pathNodes, toStepWisePath, manhattanDistance };
const DLS = (graph, start, goal, limit) => {
    const stack = [{ node: start, path: [start] }];
    const visited = new Set();
    visited.add(start);

    while (stack.length > 0) {
        const { node, path } = stack.pop();
        const neighbors = graph[node];

        for (let neighbor of neighbors) {
            if (neighbor === goal) {
                return { pathExists: true, path: [...path, neighbor] };
            }

            if (!visited.has(neighbor) && path.length < limit) {
                visited.add(neighbor);
                stack.push({ node: neighbor, path: [...path, neighbor] });
            }
        }
    }

    return { pathExists: false, path: [] };
};

export default DLS;
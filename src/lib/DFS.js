const DFS = (graph, start, end) => {
    const stack = [start];
    const path = [];
    const visited = new Set();
    visited.add(start);

    while (stack.length > 0) {
        const node = stack.pop();
        path.push(node);
        const neighbors = graph[node];

        for (let neighbor of neighbors) {

            if (neighbor === end) {
                return { pathExists: true, path: [...path, neighbor] };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }

    return { pathExists: false, path };
};

export default DFS;
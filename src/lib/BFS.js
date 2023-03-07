const BFS = (graph, start, end) => {
    const queue = [start];
    const path = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift();
        path.push(node);
        const neighbors = graph[node];

        for (let neighbor of neighbors) {

            if (neighbor === end) {
                return { pathExists: true, path: [...path, neighbor] };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return { pathExists: false, path };
};

export default BFS;
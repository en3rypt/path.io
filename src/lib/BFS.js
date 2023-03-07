const BFS = (graph, start, end) => {
    const queue = [start];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift();
        const neighbors = graph[node];

        for (let neighbor of neighbors) {
            if (neighbor === end) {
                return true;
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return false;
};

export default BFS;
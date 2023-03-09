const BFS = (graph, start, end) => {
    const queue = [start];
    const addedToQueueBy = {};
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift();
        const neighbors = graph[node];

        for (let neighbor of neighbors) {

            if (neighbor === end) {
                addedToQueueBy[neighbor] = node;
                return { pathExists: true, addedToQueueBy };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                addedToQueueBy[neighbor] = node;
                queue.push(neighbor);
            }
        }
    }

    return { pathExists: false, addedToQueueBy };
};

export default BFS;
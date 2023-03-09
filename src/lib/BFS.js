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
                visited.add(neighbor);
                return { pathExists: true, addedToQueueBy, visited };
            }

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                addedToQueueBy[neighbor] = node;
                queue.push(neighbor);
            }
        }
    }

    return { pathExists: false, addedToQueueBy, visited };
};

export default BFS;
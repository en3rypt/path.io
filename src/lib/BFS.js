const BFS = (graph, start, end) => {
    const startString = `${start.x}-${start.y}`;
    const endString = `${end.x}-${end.y}`;
    const queue = [startString];
    const addedToQueueBy = {};
    const visited = new Set();
    visited.add(startString);

    while (queue.length > 0) {
        const node = queue.shift();
        const neighbors = graph[node];

        for (let neighbor of neighbors) {

            if (neighbor === endString) {
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
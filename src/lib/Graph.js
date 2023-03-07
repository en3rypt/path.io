class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            (v) => v !== vertex1
        );
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

export default Graph;


// const graph = new Graph();

// graph.addVertex("Tokyo");
// graph.addVertex("Dallas");
// graph.addVertex("Aspen");
// graph.addVertex("Los Angeles");

// graph.addEdge("Tokyo", "Dallas");
// graph.addEdge("Tokyo", "Aspen");
// graph.addEdge("Dallas", "Aspen");
// graph.addEdge("Dallas", "Los Angeles");
// graph.addEdge("Aspen", "Los Angeles");

// console.log(graph);
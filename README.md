# path.io

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

path.io is a pathfinding visualization tool that demonstrates various pathfinding algorithms, including the A\* (A-star) algorithm. It is designed to help users understand how these algorithms work by providing a visual representation of the pathfinding process.

## Features

- Visualization of the
  1.  A\*
  2.  breadth First Search
  3.  Depth First Search
  4.  Depth Limited Search
  5.  Greedy Best First Search
  6.  Iterative Deepening Depth First Search
- Display of the shortest path found by the algorithm.
- Customizable obstacles.

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/path.io.git
   ```

2. Navigate to the project directory:

   ```sh
   cd path.io
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. The interface will set the start and end points on the grid.
3. Add obstacles by clicking on the grid cells.
4. Click the "Start" button to visualize the algorithm of your choice.
5. Compare results between all algorithms by using the compare functionality.

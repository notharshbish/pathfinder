// BFS implementation
export const bfs = (grid, startNode, endNode) => {
  const visitedNodes = [];
  const queue = [startNode];
  const visited = new Set([startNode]);

  while (queue.length) {
    const currentNode = queue.shift();
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      return visitedNodes;
    }

    const neighbors = getNeighbors(grid, currentNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodes;
};

  
  // Helper function to get neighbors of a node
  const getNeighbors = (grid, node) => {
    const neighbors = [];
    const { row, col } = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    
    return neighbors.filter(neighbor => !neighbor.isWall);
  }
  
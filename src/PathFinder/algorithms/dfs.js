export const dfs = (grid, startNode, endNode) => {
  const visitedNodes = [];
  const stack = [startNode];
  startNode.visited = true;

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode === endNode) {
      visitedNodes.push(currentNode);
      return visitedNodes;
    }

    visitedNodes.push(currentNode);
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

    for (let neighbor of unvisitedNeighbors) {
      neighbor.visited = true;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }

  return visitedNodes;
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {row, col} = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter(neighbor => !neighbor.visited && !neighbor.isWall);
};

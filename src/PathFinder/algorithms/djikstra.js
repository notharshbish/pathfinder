export function dijkstra(grid, startNode, endNode) {
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;
  
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === endNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall)
      neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall)
      neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall)
      neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall)
      neighbors.push(grid[row][col + 1]);
    return neighbors;
  }
  
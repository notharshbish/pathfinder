export const swarm = (grid, startNode, endNode) => {
    const unvisitedNodes = new Set(grid.flat());
    const visitedNodes = [];
  
    startNode.distance = 0;
    startNode.heuristic = getDistance(startNode, endNode);
  
    while (unvisitedNodes.size) {
      const currentNode = getClosestNodeWithDistance(unvisitedNodes);
  
      if (currentNode.isWall) continue;
  
      if (currentNode.distance === Infinity) return visitedNodes;
  
      currentNode.isVisited = true;
      visitedNodes.push(currentNode);
      unvisitedNodes.delete(currentNode);
  
      if (currentNode === endNode) return visitedNodes;
  
      const neighbors = getNeighbors(grid, currentNode);
  
      for (let neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          const tentativeDistance = currentNode.distance + getDistance(currentNode, neighbor);
  
          if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.heuristic = getDistance(neighbor, endNode);
            neighbor.previousNode = currentNode;
          }
        }
      }
    }
  }
  
  const getNeighbors = (grid, node) => {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors;
  }
  
  const getDistance = (nodeA, nodeB) => {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
  
    return dx + dy;
  }
  
  const getClosestNodeWithDistance = (nodes) => {
    let closestNode = null;
  
    for (let node of nodes) {
      if (!closestNode || node.distance + node.heuristic < closestNode.distance + closestNode.heuristic) {
        closestNode = node;
      }
    }
  
    return closestNode;
  }
  
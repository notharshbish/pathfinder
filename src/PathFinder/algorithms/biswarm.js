export function biswarm(grid, startNode, endNode) {
    const unvisitedNodes = new Set(grid.flat());
    const distances = new Map();
    const previousNodes = new Map();
    
    // Set initial distance to start node as 0
    distances.set(startNode, 0);
    
    // Set initial distances to other nodes as Infinity
    for (let row of grid) {
      for (let node of row) {
        if (node !== startNode) {
          distances.set(node, Infinity);
        }
      }
    }
    
    while (unvisitedNodes.size > 0) {
      // Find the unvisited node with the smallest distance
      let currentNode = null;
      let currentDistance = Infinity;
      for (let node of unvisitedNodes) {
        if (distances.get(node) < currentDistance) {
          currentNode = node;
          currentDistance = distances.get(node);
        }
      }
      
      // If we've reached the end node, we're done
      if (currentNode === endNode) {
        break;
      }
      
      // Remove the current node from the unvisited set
      unvisitedNodes.delete(currentNode);
      
      // Get the neighbors of the current node
      const neighbors = getNeighbors(grid, currentNode);
      
      for (let neighbor of neighbors) {
        // Calculate the tentative distance from the start node to this neighbor
        const tentativeDistance = distances.get(currentNode) + getDistance(currentNode, neighbor);
        
        // If the tentative distance is smaller than the current distance, update the distance
        if (tentativeDistance < distances.get(neighbor)) {
          distances.set(neighbor, tentativeDistance);
          previousNodes.set(neighbor, currentNode);
        }
      }
    }
    
    // Reconstruct the path from the start node to the end node
    let currentNode = endNode;
    const path = [endNode];
    while (currentNode !== startNode) {
      currentNode = previousNodes.get(currentNode);
      path.unshift(currentNode);
    }
    
    return path;
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
  
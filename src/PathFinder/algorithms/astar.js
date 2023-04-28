export function aStar(grid, startNode, endNode) {
    
    // Define helper functions
    function getNodeWithLowestFscore(openSet) {
      let lowestFscoreNode = openSet[0];
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].distance + openSet[i].heuristic < lowestFscoreNode.distance + lowestFscoreNode.heuristic) {
          lowestFscoreNode = openSet[i];
        }
      }
      return lowestFscoreNode;
    }
  
    function getDistanceBetweenNodes(nodeA, nodeB) {
      const dx = nodeA.col - nodeB.col;
      const dy = nodeA.row - nodeB.row;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // Initialize start and end nodes
    // console.log(grid[startNode.row][startNode.col])
    const startNodeObj = startNode
    // console.log("startNodeObj : ", startNodeObj)
    const endNodeObj = endNode
    startNodeObj.distance = 0;
    startNodeObj.heuristic = getDistanceBetweenNodes(startNodeObj, endNodeObj);
  
    // Initialize open and closed sets
    const openSet = [startNodeObj];
    const closedSet = [];
  
    // Main loop
    while (openSet.length > 0) {
      // Get node with lowest F-score from open set
      const currentNode = getNodeWithLowestFscore(openSet);
  
      // End condition: reached end node
      if (currentNode === endNodeObj) {
        const shortestPath = [];
        let node = currentNode;
        while (node.previousNode) {
        //   const nodeEl = document.getElementById(`node-${node.row}-${node.col}`)
          shortestPath.unshift(grid[node.row][node.col]);
          node = node.previousNode;
        }
        shortestPath.unshift(grid[startNodeObj.row][startNodeObj.col]);
        return shortestPath;
      }
  
      // Remove current node from open set and add to closed set
      openSet.splice(openSet.indexOf(currentNode), 1);
      closedSet.push(currentNode);
  
      // Check neighbors
      const neighbors = [];
      if (currentNode.row > 0) neighbors.push(grid[currentNode.row - 1][currentNode.col]);
      if (currentNode.row < grid.length - 1) neighbors.push(grid[currentNode.row + 1][currentNode.col]);
      if (currentNode.col > 0) neighbors.push(grid[currentNode.row][currentNode.col - 1]);
      if (currentNode.col < grid[0].length - 1) neighbors.push(grid[currentNode.row][currentNode.col + 1]);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
  
        // Skip if neighbor is already in closed set or is a wall
        if (closedSet.includes(neighbor) || neighbor.isWall) continue;
  
        // Calculate tentative G score
        const tentativeGScore = currentNode.distance + 1;
  
        // Add neighbor to open set if not already in it
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          neighbor.heuristic = getDistanceBetweenNodes(neighbor, endNodeObj);
        } else if (tentativeGScore >= neighbor.distance) {
          continue;
        }
  
        // Update neighbor's distance, previous node, and visited flag
        neighbor.distance = tentativeGScore;
        neighbor.previousNode = currentNode;
        neighbor.visited = true;
      }
    }
  
    // End condition not met: no path found
    return null;
  }
  
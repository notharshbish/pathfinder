import React, { useEffect, useState } from 'react'
import Node from './Node'
import './PathFinder.css'
import {dijkstra} from './algorithms/djikstra.js'
import { aStar } from './algorithms/astar'
import { bfs } from './algorithms/bfs'
import { dfs } from './algorithms/dfs'
import { swarm } from './algorithms/swarm'
import { biswarm } from './algorithms/biswarm' 

function PathFinder() {
    const dim = [38, 101] 
    const [nodes , setNodes] = useState([])
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [startNode, setStartNode] = useState([0, 0]);
    const [endNode, setEndNode] = useState([12, 21]);
    const [startSelect, setStartSelect] = useState(false)
    const [endSelect, setEndSelect] = useState(false)
    const [algo, setAlgo] = useState({complex : '', simple : ''})


    useEffect(() => {
        initialGrid()
    }, [])


    const createNode = (row, col) => {
        return {
            row, 
            col , 
            isStart : row === startNode[0] && col === startNode[1] , 
            isFinish : row === endNode[0] && col === endNode[1] , 
            isWall : false , 
            visited : false , 
            distance : Infinity , 
            previousNode : null, 
            isVisited : false , 
            heuristic : null 
        }
    }

    const selectAlgo = () => {
        if (algo === 'dijkstra') {

        }
    }

    const initialGrid = () => {
        const grid = [] 
        for(let row = 0 ; row < 39; row++) {
            const currentRow = [] 
            for (let col = 0; col < 102; col++) {
                const currentNode = createNode(row,col)
                currentRow.push(currentNode)
            }
            grid.push(currentRow)
        }
        setNodes(grid)
    }

    const resetAfter = () => {
        const newNodes = [...nodes] 
        for(let row = 0 ; row < newNodes.length; row ++) {
            for(let col = 0; col < newNodes[row].length; col++) {
                const nodeEl = document.getElementById(`node-${row}-${col}`)
                newNodes[row][col].isVisited = false 
                newNodes[row][col].visited = false
                if(!newNodes[row][col].isWall) { 
                    nodeEl.style.backgroundColor = 'white'
                    nodeEl.style.borderColor = 'rgb(175, 216, 248)'
                    // newNodes[row][col].isWall = false
                }
            }
        }
    }

    const changeNodeStyle = (e) => {
        e.target.style.backgroundColor = "#34495e";
        e.target.style.transition = "none";
        e.target.style.transform = "scale(0.5)";
        e.target.style.borderColor = "#34495e" ; 
        setTimeout(() => {
        e.target.style.transition = "background-color 0.2s ease-in-out, transform 0.2s ease-in-out";
        e.target.style.transform = "scale(1)";
        }, 50);
    }

    const changeAlgoNodeStyle = (node, color) => {
        if (!node.isStart && !node.isFinish) {
            
        }
        const nodeElem = document.getElementById(`node-${node.row}-${node.col}`);
        nodeElem.style.backgroundColor = color ;
        nodeElem.style.borderColor = color  
    };

    const changeTargetNodes = async (node) => {
        let prevTargetElem = null;
        let prevTarget = null;
        if (startSelect && prevTargetElem == null) {
            prevTargetElem = await document.getElementById(`node-${startNode[0]}-${startNode[1]}`);
            prevTarget = nodes[startNode[0]][startNode[1]];
        } else if (endSelect && prevTargetElem == null) {
            prevTargetElem = document.getElementById(`node-${endNode[0]}-${endNode[1]}`);
            prevTarget = nodes[endNode[0]][endNode[1]];
        }
        const currentNodeElem = await document.getElementById(`node-${node.row}-${node.col}`);
        if (startSelect) {
            prevTargetElem.className = 'node';
            prevTarget.isStart = false;
            currentNodeElem.className = 'node start';
            node.isStart = true;
            setStartNode([node.row, node.col]);
        } else if (endSelect) {
            prevTargetElem.className = 'node';
            prevTarget.isFinish = false;
            currentNodeElem.className = 'node finish';
            node.isFinish = true;
            setEndNode([node.row, node.col]);
        }
        // Reset isStart and isFinish values of other nodes
        const newNodes = [...nodes];
        for (let i = 0; i < newNodes.length; i++) {
            for (let j = 0; j < newNodes[i].length; j++) {
                if (newNodes[i][j].isStart && (i !== node.row || j !== node.col) && startSelect) {
                    newNodes[i][j].isStart = false;
                }
                if (newNodes[i][j].isFinish && (i !== node.row || j !== node.col) && endSelect) {
                    newNodes[i][j].isFinish = false;
                }
            }
        }
        setNodes(newNodes);
    };



    const visualizeDijkstra = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        console.log(nodes)
        const visitedNodesInOrder = dijkstra(nodes, start, end);
    
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
    
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      };

      const visualizeAStar = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        const visitedNodesInOrder = aStar(nodes, start, end);
        console.log(visitedNodesInOrder)

        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
      
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      }

      const visualizeBFS = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        const visitedNodesInOrder = bfs(nodes, start, end);
        console.log("BFS Visited Nodes : ", visitedNodesInOrder)
      
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
      
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      }



      const visualizeDFS = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        const visitedNodesInOrder = dfs(nodes, start, end);
      
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
      
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      }

      const visualizeSwarm = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        const visitedNodesInOrder = swarm(nodes, start, end);
      
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
      
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      }

      const visualizeBiSwarm = () => {
        resetAfter()
        const start = nodes[startNode[0]][startNode[1]];
        const end = nodes[endNode[0]][endNode[1]];
        const visitedNodesInOrder = biswarm(nodes, start, end);
      
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              visualizeShortestPath(end);
            }, 10 * i);
            return;
          }
      
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            changeAlgoNodeStyle(node, 'rgba(0, 190, 218, 0.75)');
          }, 10 * i);
        }
      }
    
      const visualizeShortestPath = (endNode) => {
        const shortestPath = [];
        let currentNode = endNode;
        while (currentNode !== null) {
          shortestPath.unshift(currentNode);
          currentNode = currentNode.previousNode;
        }
    
        for (let i = 0; i < shortestPath.length; i++) {
          setTimeout(() => {
            const node = shortestPath[i];
            changeAlgoNodeStyle(node, 'yellow');
          }, 50 * i);
        }
      };

    const handleMouseDown = (event, row, col) => {
        
        event.preventDefault() 
        const newNodes = [...nodes]
        const node = newNodes[row][col]
        if(node.isStart !== true && node.isFinish !== true)  {
            // console.log('isStart : ', node.isStart)
            // console.log("Yeh fir bhi execute hora hai")
            node.isWall = true 
            setNodes(newNodes) 
            // console.log(nodes)
            setIsMouseDown(true)
            changeNodeStyle(event)
        } else if(node.isStart === true) {
            // console.log('isStart : ', node.isStart)
            // console.log('Yeh run ho rha hai kya')
            setStartSelect(true)
            // setIsMouseDown(true) 
            // console.log('setMouseDown : ', isMouseDown)
        } else if (node.isFinish === true) {
            setEndSelect(true)
        }
    }
    

    const handleMouseEnter = async (event, row, col) => {
        event.preventDefault() 
        // console.log(isMouseDown, row, col)
        // console.log(startNode)
        // console.log("Trigger toh ho rha hu")
        if(isMouseDown && nodes[row][col].isStart !== true && nodes[row][col].isFinish !== true) {
            const newNodes = [...nodes]
            const node = newNodes[row][col]
            // console.log('row : ', row , ", col : ", col)
            node.isWall = true 
            setNodes(newNodes)
            changeNodeStyle(event)
        } else if (startSelect){
            // console.log('This is in the start handleMouseEnter function')
            setStartNode([row, col])
            await changeTargetNodes(nodes[row][col])
        } else if (endSelect){
            setEndNode([row, col])
            changeTargetNodes(nodes[row][col])
        }
    }

    
    const handleMouseUp = () => {
        setIsMouseDown(false)
        startSelect ? setStartSelect(false) : setEndSelect(false) 
    }

  
    return (
        <div className = "finder">
            {/* Header */}
            <div className = "header">
                <span>Header</span>
                <div className='button-container'>
                    <button onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</button>
                    <button onClick={visualizeAStar}>Visualize A Star Algorithm</button>
                    <button onClick={visualizeBFS}>Visualize BFS Algorithm</button>
                    <button onClick={visualizeDFS}>Visualize DFS Algorithm</button>
                    <button onClick={visualizeSwarm}>Visualize Swarm Algorithm</button>
                    <button onClick={visualizeBiSwarm}>Visualize Bi-Directional Algorithm</button>
                </div>
            </div>
            {/* Table 38 x 101*/}
            <div className = "grid" onMouseUp={() => handleMouseUp()}>
                {nodes?.map((row, rowIndx) => {
                    return (<div key = {rowIndx} className = "row">
                    {row.map((node, nodeIndx) => {
                        return(
                            <Node
                                key = {nodeIndx}
                                row = {node.row} 
                                col = {node.col} 
                                isStart = {node.isStart} 
                                isFinish = {node.isFinish}
                                isWall = {node.isWall}
                                handleMouseDown = {handleMouseDown}
                                handleMouseEnter = {handleMouseEnter}
                            ></Node>
                        )
                    })}
                    </div>
                    )
                })}
            </div>
        </div>
  )
}

export default PathFinder
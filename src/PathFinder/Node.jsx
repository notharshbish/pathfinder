import React from 'react'
import "./Node.css"
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import right from './images/right.png'
import aim from './images/aim.png'

function Node({row, col, isStart, isFinish, isWall, handleMouseDown, handleMouseEnter}) {
 

  return (
    <div id = {`node-${row}-${col}`}  className = {`node ` + (isStart ? 'start' : isFinish ? 'finish' : '')} 
        //  style = {{backgroundColor : isWall ? '#34495e' : 'white'}}
         onMouseEnter = {e => handleMouseEnter(e, row, col)}
         onMouseDown={e => handleMouseDown(e, row, col)}
    >
      {isStart ? (
          <img style = {{
            height : '10px' , 
            width : '10px' ,
            padding : 0 
          }} src = {right}></img>
        ) : isFinish ? (
          // <ModeStandbyIcon fontSize = "extra-small" />
          <img style = {{ 
            height : '10px' , 
            width : '10px' ,
            padding : 0 
          }} src = {aim}></img>
      ) : null}
    </div>
  )
}

export default Node
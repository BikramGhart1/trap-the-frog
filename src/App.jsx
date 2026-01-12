import './App.css'
import Board from './components/Board'

function App() {

  return (
    <>
      <div className="app-container" >
        <h1 className="fs-5" style={{color:"#e0ffefff"}}>Trap The Frog</h1>
        <div className='d-flex flex-row justify-content-between'>
          <p>Moves - <span>0</span></p>
          <div className='d-flex flex-row gap-4'>
          <p>Frog - <span>🐸</span></p>
          <p>Obstacle - <button style={{width:"15px", height:"15px", backgroundColor:"#23d160",borderRadius:"4px", border:"none", outline:"none"}}></button></p>
          </div>
        </div>
        <Board/>
        </div>      
    </>
  )
}

export default App

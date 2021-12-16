import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import './Home.scss';

const Home = () => {

  const socket = useSelector((state) => state.socket.socket);
  const navigate = useNavigate();

  const [ value, setValue ] = useState("")
  const [ checked, setChecked ] = useState(true)
  const { state } = useLocation();


  useEffect(()=>{
    if (state === "reload") {
      navigate("/",{})
      window.location.reload()
    }
  },[])

  const joinGame = (id) => {
    console.log(id)
    socket.emit("join_game", id)
    socket.on("room_joined", (roomId)=> {
      navigate(`/game/${roomId}`)
    }) 
  }

  const createGame = (value) => {
    const privacy = document.getElementById("public").checked ? "PUBLIC" : "PRIVATE";
    // console.log({value,privacy})
    // socket.emit("create_game", {value,privacy})
    socket.emit("create_game",privacy,value)
    console.log("emited create game")
    socket.on("game_created", (res)=> {
        console.log("about to join room")
        joinGame(res.id)
    })
  }

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="twin-container">
          <div className="home-box" id="join-table">
            <div className="home-box-container">
              <h1 className="home-box-header">Join Table</h1>
              <div className="stakes-header">
                <p>Stakes</p>
                <p>Mix/Max Buy-in</p>
              </div>
              <div className="stake-box">
                <div className="stake-inside-flex" onClick={()=>joinGame(null)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>10</p>
                  </div>
                  <p>200/1000</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>joinGame(null)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>100</p>
                  </div>
                  <p>2000/10000</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>joinGame(null)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>1000</p>
                  </div>
                  <p>20000/100000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="home-box" id="create_room">
            <div className="home-box-container">
              <h1 className="home-box-header">Create Game</h1>
              <div className="stakes-header">
                <p>Stakes</p>
                <p>Mix/Max Buy-in</p>
              </div>
              <div className="stake-box">
                <div className="stake-inside-flex" onClick={()=>createGame(1000)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>10</p>
                  </div>
                  <p>200/1000</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(10000)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>100</p>
                  </div>
                  <p>2000/10000</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(100000)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>1000</p>
                  </div>
                  <p>20000/100000</p>
                </div>
              </div>
              <div className="privacy">
                <input id="public" name="privacy" type="radio" value="public" onChange={()=>setChecked(!checked)} checked={checked}/>
                <label htmlFor="public">Public</label>
                <input id="private" name="privacy" type="radio" value="private" onChange={()=>setChecked(!checked)} checked={!checked}/>
                <label htmlFor="private">Private</label>
              </div>
            </div>
          </div>
          <div className="column3">
            <div className="join-private" id="join-private">
              <div>
                <h1 >Join Private Game</h1>
                <form>
                  <input id="gameId" placeholder="Enter ID" value={value} onChange={(e)=>setValue(e.target.value)}/>
                  <button onClick={(e)=>{
                    e.preventDefault();
                    joinGame(value);
                  }}>Join Game</button>
                </form>
              </div>
            </div>
            <div className="item-shop" id="item-shop">
              <div >
                <h1 >Item Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Home.scss';

const Home = () => {

  const socket = useSelector((state) => state.socket.socket);
  const navigate = useNavigate();

  const [ value, setValue ] = useState("")
  const [ checked, setChecked ] = useState(true)

  const joinGame = (id) => {
    console.log(id)
    socket.emit("join_game", id)
    socket.on("user_has_joined", (roomId)=> {
      navigate(`/game/${roomId}`)
    }) 
  }

  const createGame = (value) => {
    const privacy = document.getElementById("public").checked ? "public" : "private";
    console.log({value,privacy})
    socket.emit("create_game", {value,privacy})
    socket.on("game_created", (id)=> {
        joinGame(id)
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
                <div className="stake-inside-flex" onClick={()=>createGame(1)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>1k</p>
                  </div>
                  <p>20k/100k</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(10)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>10k</p>
                  </div>
                  <p>200k/1M</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(100)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>100k</p>
                  </div>
                  <p>2M/10M</p>
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
                <div className="stake-inside-flex" onClick={()=>createGame(1)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>1k</p>
                  </div>
                  <p>20k/100k</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(10)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>10k</p>
                  </div>
                  <p>200k/1M</p>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(100)}>
                  <div className="stakes">
                    <div className="chip-wrapper"></div>
                    <p>100k</p>
                  </div>
                  <p>2M/10M</p>
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

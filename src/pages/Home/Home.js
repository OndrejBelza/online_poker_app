import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Home.scss';

const Home = () => {

  const socket = useSelector((state) => state.socket.socket);
  const navigate = useNavigate();



  const joinGame = (id) => {
    socket.emit("join_game", id)
    socket.on("user_has_joined", (roomId)=> {
      navigate(`/game/${roomId}`)
    }) 
  }

  const createGame = (value) => {
    socket.emit("create_game", value)
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
              <div className="stakes-header">Stakes</div>
              <div className="stake-box">
                <div className="stake-inside-flex" onClick={()=>createGame(1)}>
                  <div>1k</div>
                  <div className="chip-wrapper"></div>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(10)}>
                  <div>10k</div>
                  <div className="chip-wrapper"></div>
                </div>
                <div className="stake-inside-flex"onClick={()=>createGame(100)}>
                  <div>100k</div>
                  <div className="chip-wrapper"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-box" id="item-shop">
            <div className="home-box-container">
              <h1 className="home-box-header">Item Shop</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

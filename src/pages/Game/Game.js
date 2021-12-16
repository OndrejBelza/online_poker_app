import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import Card from "../../components/Card/Card";

import "./Game.scss";


const Game = () => {
    const socket = useSelector((state) => state.socket.socket);
    const navigate = useNavigate();
    const { id } = useParams();


    const [ table, setTable ] = useState(null);
    const [ winner, setWinner ] = useState(null);

    useEffect(()=>{
        socket.emit("get_game_data", id)
    },[])

    useEffect(()=>{
        socket.on("user_has_joined", (username)=> {
            console.log(username)
            socket.emit("get_game_data", id)
        }) 
        socket.on("user_has_left", (res) => {
            console.log(res);
            socket.emit("get_game_data", id)
          });
        socket.on("game_data", (data)=> {
            console.log(data)
            setTable(data)
        })
        socket.on("game_started", () => {
            console.log(`game started and user is requesting data`)
            socket.emit("get_game_data", id)
        })
        socket.on("round_started", () => {
            console.log("round started")
            socket.emit("get_game_data", id)
        })
        socket.on("player_action", () => {
            console.log("player did a move")
            socket.emit("get_game_data", id)
        })
        socket.on("winner", (winner) => {
            setWinner(winner)
            setTimeout(()=>{
                setWinner(null)
            },3000)
        })

    },[socket])
   
    const leaveTable = () => {
        socket.emit("fold",{roomId:id, id:table.currentPlayerId}); 
        socket.emit("leave_table",id)
        navigate('/', { state:"reload" })
    }

    const startGame = () => {
        socket.emit("start_game", id)
        console.log("start")
    }

    return (
        <div className="gamebackground">
        {table ? (
            <div className="game">
                <IoMdExit onClick={()=>leaveTable()} className="leaveTable"/>
                <Table table={table} />
                {/* <button id="start" style={{zIndex: 10000}} onClick={()=>startGame()}>Start</button> */}
                {winner ? (
                    <div className="winner">
                        <h1>{winner.username} is the winner!</h1>
                        <div className="winningHand">
                            {winner.hand.map((card,index)=>(
                                <Card key={index} card={card}/>
                            ))}    
                        </div>
                        <h2>{winner.description}</h2>
                    </div>
                ):(null)}
            </div>
        ):(null)}
        </div>
    );
};

export default Game;
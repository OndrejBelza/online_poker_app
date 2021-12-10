import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";

import "./Game.scss";

const Game = () => {
    const socket = useSelector((state) => state.socket.socket);
    const navigate = useNavigate();
    const { id } = useParams();


    const [ table, setTable ] = useState(null);


    useEffect(()=>{
        console.log(id)
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

    },[socket])
   
    const leaveTable = () => {
        socket.emit("leave_table",id)
        navigate('/')
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
                <button style={{zIndex: 10000}} onClick={()=>startGame()}>Start</button>
            </div>
        ):(null)}
        </div>
    );
};

export default Game;
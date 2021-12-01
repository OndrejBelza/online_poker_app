import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import "./Game.scss";

const Game = () => {
    const socket = useSelector((state) => state.socket.socket);
    const navigate = useNavigate();

    const [ table, setTable ] = useState();
    const [ gameId, setGameID ] = useState(undefined); 
    useEffect(()=>{
        socket.emit("create_game")
        socket.on("game_created", (res)=> {
            setGameID(res.id)
        })
    },[])
    useEffect(()=>{
        if (gameId) {
            socket.emit("join_game", gameId)
            socket.emit("get_game_data", gameId)
        }
        socket.on("user_has_joined", (response)=> {
            console.log(response)
        }) 
        socket.on("game_data", (data)=> {
            console.log(data)
            setTable(data)
            console.log("game data changed")
            console.log(data.players)

        })
    },[gameId])

    useEffect(()=>{
        socket.on("game_data", (data)=> {
            console.log(data)
            setTable(data)
            console.log("game data changed")
            console.log(data.players)

        })
    },[socket])
   
    const leaveTable = () => {
        socket.emit("leave_table")
        navigate('/')
    }

    return (
        <div className="gamebackground">
        {table ? (
            <div className="game">
                <IoMdExit onClick={()=>leaveTable()} className="leaveTable"/>
                <Table table={table} />
            </div>
        ):(null)}
        </div>
    );
};

export default Game;
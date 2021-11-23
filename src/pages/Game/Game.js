import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import "./Game.scss";
const Game = () => {
    const socket = useSelector((state) => state.socket.socket);

    const [ table, setTable ] = useState();

    useEffect(()=>{
        socket.emit("create_game","1")
        socket.on("game_data", (data)=> {
            setTable(data)
            console.log("game data changed")
            console.log(data.players)

        })

        socket.emit("join_game","1");  
        socket.on("user_has_joined", (response)=> {
            console.log(response)
        }) 
       
    },[])
   

    return (
        table ? (
            <div className="game">
                <Table table={table} />
            </div>
        ):(null)
    );
};

export default Game;
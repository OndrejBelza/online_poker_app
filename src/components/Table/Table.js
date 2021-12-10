// import { useEffect, useState } from "react";
import Player from "../Player/Player";
import Deck from "../Deck/Deck";
import Chips from "../../icons/poker-chips.png";
import { useSelector } from "react-redux";
import "./Table.scss";
import { useEffect, useState } from "react";
const Table = (props) => {

    const socket = useSelector((state) => state.socket.socket);

    // const [ chips, setChips ] = useState([]);

    // useEffect(()=>{
    //     setChips([...chips,])
    // },[props.table.pot])

    return (
        <div className="table">
            {props.table.players.map(player=> (
                <Player key={player.id} player={player} table={props.table}/> 
            ))}
            <div className="pot">
                <div className="chips">
                    <img alt="chips" src={Chips}/>
                    <img alt="chips" src={Chips}/>
                    <img alt="chips" src={Chips}/>
                    <img alt="chips" src={Chips}/>
                </div>
                <p>${props.table.pot}</p>
            </div>
            
            <Deck deck={props.table.deck}/>
        </div>
    );
};

export default Table;
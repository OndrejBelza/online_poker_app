import { useEffect, useState } from "react";
import Player from "../Player/Player";
import Deck from "../Deck/Deck";
import Chips from "../../icons/poker-chips.png";
import "./Table.scss";
const Table = (props) => {

    return (
        <div className="table">
            {props.table.players.map(player=> (
                <Player player={player} table={props.table}/> 
            ))}
            <div className="pot">
                <div className="chips">
                    <img src={Chips}/>
                    <img src={Chips}/>
                    <img src={Chips}/>
                    <img src={Chips}/> 
                </div>
                <p>${props.table.pot}</p>
            </div>
            
            <Deck deck={props.table.deck}/>
        </div>
    );
};

export default Table;
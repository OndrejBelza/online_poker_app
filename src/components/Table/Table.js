import { useEffect, useState } from "react";
import Player from "../Player/Player";
import Deck from "../Deck/Deck";
import "./Table.scss";
const Table = (props) => {
    const [ players, setPlayers ] = useState(props.table.players)
    const [ deck, setDeck ] = useState(props.table.deck)
    
    return (
        <div className="table">
            {players.map(player=> (
                <Player player={player} user={props.table.currentUser}/> 
            ))}
            <Deck deck={deck}/>
        </div>
    );
};

export default Table;
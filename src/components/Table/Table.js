import { useEffect, useState } from "react";
import Player from "../Player/Player";
import Deck from "../Deck/Deck";
import Chips from "../../icons/poker-chips.png";
import "./Table.scss";
const Table = (props) => {
    const [ players, setPlayers ] = useState(props.table.players)
    const [ deck, setDeck ] = useState(props.table.deck)
    
    useEffect(()=>{
        setPlayers(props.table.players)
    },[props.table.players])

    return (
        <div className="table">
            {players.map(player=> (
                <Player player={player} user={props.table.currentUser}/> 
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
            
            <Deck deck={deck}/>
        </div>
    );
};

export default Table;
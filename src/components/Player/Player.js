import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Chips from "../../icons/poker-chips.png";
import "./Player.scss";
const Player = (props) => {
    const [ position, setPosition ] = useState();
    const [ user, setUser] = useState(props.user);
    
    useEffect(()=>{
        if (props.player.name === user) {
            setPosition("front")
        } else {
            setPosition("back")
        }
    },[user])
    return (
        position ? (
        <div className={`players player${props.player.position}`}>
            <p>{props.player.name}</p>
            <img className="portrait" src={props.player.portrait}/>
            <div className="hand">
            {props.player.hand.map(card=>(
                <Card card={card} skin={props.player.skin} position={position}/>
            ))}
            </div>
            <div className="chips">
                <img src={Chips}/>
                <p>${props.player.chips}</p>
            </div>
            <div className="actions">
                <button className="check">Check</button>
                <button className="fold">Fold</button>
                <button className="Bet">Bet</button>
            </div>
        </div>
        ):(null)
    );
};

export default Player;
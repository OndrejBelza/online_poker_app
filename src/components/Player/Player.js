import { useEffect, useState } from "react";
import Card from "../Card/Card";
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
        <div className={`player${props.player.position}`}>
            <p>{props.player.name}</p>
            <p>{props.player.chips}</p>
            <div className="hand">
            {props.player.hand.map(card=>(
                <Card card={card} skin={props.player.skin} position={position}/>
            ))}
            </div>
        </div>
        ):(null)
    );
};

export default Player;
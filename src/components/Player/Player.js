import { useEffect } from "react";
import Card from "../Card/Card";
import "./Player.scss";
const Player = (props) => {
    
    return (
        <div className={`player${props.position}`}>
            <Card />
        </div>
    );
};

export default Player;
import { useEffect } from "react";
import Player from "../../components/Player/Player";
import "./Game.scss";
const Game = () => {
    return (
        <div className="game">
            <Player position={1}/>
        </div>
    );
};

export default Game;
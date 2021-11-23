import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Deck.scss";
const Deck = (props) => {
    const [ deck, setDeck ] = useState(props.deck)
    return (
        <div className="deck">
            {deck.map(card=> (
                <Card card={card} skin="default" display="front"/> 
            ))}
            {/* <Card card={{value:null,suit:null}} position="back" skin="default"/> */}
        </div>
    );
};

export default Deck;
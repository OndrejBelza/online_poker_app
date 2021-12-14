// import { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Deck.scss";
const Deck = (props) => {

    return (
        <div className={"deck"}>
            {props.deck.map(card=> (
                <Card key={card.suit+card.value} card={card}/> 
            ))}
        </div>
    );
};

export default Deck;
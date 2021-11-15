import { useEffect, useState } from "react";
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from "react-icons/bs"
import "./Card.scss";
const Card = () => {
    const [ card, setCard ] = useState({
        value: "A",
        suit: "spades",
        skin: "default"
    }) 

    useEffect(()=>{
        document.getElementById(`${card.value}${card.suit}`).style.backgroundColor = "red"
    },[])
    
    return (
        <div className="cardContainer">
            <div className="frontCard">
                <p>{card.value}</p>
                { 
                (() => { 
                    switch(card.suit) {
                        case "spades":
                            return <BsFillSuitSpadeFill className="suit"/>
                        case "diamonds":
                           return <BsFillSuitDiamondFill className="suit"/>
                        case "Hearts":
                            return<BsFillSuitHeartFill className="suit"/>
                        case "Clubs":
                            return <BsFillSuitClubFill className="suit"/>
                        default:
                            return null;
                        }
                    })()
                }
            </div>
            <div id={`${card.value}${card.suit}`}>

            </div>
        </div>
    );
};

export default Card;
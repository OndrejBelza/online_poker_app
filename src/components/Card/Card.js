import { useEffect, useState } from "react";
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from "react-icons/bs"
import "./Card.scss";
const Card = (props) => {
    const [ card, setCard ] = useState({
        value: props.card.value,
        suit: props.card.suit,
        skin: props.skin,
        position: props.position
    }) 

    // useEffect(()=>{
    //     console.log(card.position)
    // },[])
    
    return (
        <div className="cardContainer">
            {card.position === "front" ? (
               <div className="frontCard">
                <p>{card.value}</p>
                { 
                (() => { 
                    switch(card.suit) {
                        case "spades":
                            return <BsFillSuitSpadeFill className="suit"/>
                        case "diamonds":
                           return <BsFillSuitDiamondFill className="suit"/>
                        case "hearts":
                            return<BsFillSuitHeartFill className="suit"/>
                        case "clubs":
                            return <BsFillSuitClubFill className="suit"/>
                        default:
                            return null;
                        }
                    })()
                }
                </div> 
            ):(
                <div className={`backCard ${card.skin}`} >

                </div>
            )}
        </div>
    );
};

export default Card;
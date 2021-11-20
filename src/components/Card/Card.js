import { useEffect, useState } from "react";
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from "react-icons/bs"
import "./Card.scss";
const Card = (props) => {
    const [ card, setCard ] = useState({
        value: props.card.value,
        suit: props.card.suit,
        skin: props.skin,
        display: props.display
    }) 

    // useEffect(()=>{
    //     console.log(card.position)
    // },[])
    
    return (
        <div className="cardContainer">
            {card.display ? (
               <div className="frontCard">
                { 
                (() => { 
                    switch(card.suit) {
                        case "spades":
                            return <>
                                <p>{card.value}</p>
                                <BsFillSuitSpadeFill className="suit"/>
                            </>
                        case "diamonds":
                           return <>
                            <p style={{color:"red"}}>{card.value}</p>
                            <BsFillSuitDiamondFill color="red" className="suit"/>
                        </>
                        case "hearts":
                            return <>
                                <p style={{color:"red"}}>{card.value}</p>
                                <BsFillSuitHeartFill color="red" className="suit"/>
                            </>
                        case "clubs":
                            return <>
                                <p>{card.value}</p>
                                <BsFillSuitClubFill className="suit"/>
                            </>
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
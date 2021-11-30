import { useEffect, useState } from "react";
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from "react-icons/bs"
import "./Card.scss";
const Card = (props) => {
    
    return (
        <div className="cardContainer">
            {props.display ? (
               <div className="frontCard">
                { 
                (() => { 
                    switch(props.card.suit) {
                        case "spades":
                            return <>
                                <p>{props.card.value}</p>
                                <BsFillSuitSpadeFill className="suit"/>
                            </>
                        case "diamonds":
                           return <>
                            <p style={{color:"red"}}>{props.card.value}</p>
                            <BsFillSuitDiamondFill color="red" className="suit"/>
                        </>
                        case "hearts":
                            return <>
                                <p style={{color:"red"}}>{props.card.value}</p>
                                <BsFillSuitHeartFill color="red" className="suit"/>
                            </>
                        case "clubs":
                            return <>
                                <p>{props.card.value}</p>
                                <BsFillSuitClubFill className="suit"/>
                            </>
                        default:
                            return null;
                        }
                    })()
                }
                </div> 
            ):(
                <div className={`backCard ${props.skin}`} >

                </div>
            )}
        </div>
    );
};

export default Card;
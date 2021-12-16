// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { BsFillSuitSpadeFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsFillSuitClubFill } from "react-icons/bs"
import "./Card.scss";
const Card = (props) => {
    return (
        <div className="cardContainer">
            {props.card.value ? (
               <div className="frontCard">
                { 
                (() => { 
                    switch(props.card.suit) {
                        case "spades":
                            return <>
                                <p>{props.card.value}</p>
                                <BsFillSuitSpadeFill color="black" className="suit"/>
                                <BsFillSuitSpadeFill color="black" className="suit2"/>
                            </>
                        case "diamonds":
                           return <>
                            <p style={{color:"red"}}>{props.card.value}</p>
                            <BsFillSuitDiamondFill color="red" className="suit"/>
                            <BsFillSuitDiamondFill color="red" className="suit2"/>
                        </>
                        case "hearts":
                            return <>
                                <p style={{color:"red"}}>{props.card.value}</p>
                                <BsFillSuitHeartFill color="red" className="suit"/>
                                <BsFillSuitHeartFill color="red" className="suit2"/>
                            </>
                        case "clubs":
                            return <>
                                <p>{props.card.value}</p>
                                <BsFillSuitClubFill color="black" className="suit"/>
                                <BsFillSuitClubFill color="black" className="suit2"/>
                            </>
                        default:
                            return null;
                        }
                    })()
                }
                </div> 
            ):(
                <div className={`backCard default`} >

                </div>
            )}
        </div>
    );
};

export default Card;
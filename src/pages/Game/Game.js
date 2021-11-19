import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import "./Game.scss";
const Game = () => {
    const [ table, setTable ] = useState({
        id: "1",
        deck:
            [{
                value: "A",
                suit: "hearts"
            },{
                value: "5",
                suit: "clubs"
            },{
                value: "6",
                suit: "spades"
            },{
                value: "6",
                suit: "spades"
            },{
                value: "6",
                suit: "spades"
            }]
        ,
        currentUser: "Gerardo",
        players: [{
            position: 1,
            portrait: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            name: "Gerardo",
            skin: "default",
            hand: [{
                value: "A",
                suit: "spades"
            },{
                value: "A",
                suit: "clubs"
            }],
            chips: 100000
        },{
            position: 2,
            name: "Taichi",
            portrait: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            skin: "default",
            hand: [{
                value: null,
                suit: null
            },{
                value: null,
                suit: null
            }],
            chips: 200000
        },{
            position: 3,
            name: "Ondrej",
            portrait: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            skin: "default",
            hand: [{
                value: null,
                suit: null
            },{
                value: null,
                suit: null
            }],
            chips: 400000
        }]
    });
    return (
        <div className="game">
            <Table table={table} />
        </div>
    );
};

export default Game;
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Chips from "../../icons/poker-chips.png";
import "./Player.scss";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover, ProgressBar } from "react-bootstrap";
import Slider from '@mui/material/Slider';
import { CircularProgress, Input } from "@mui/material";

const Player = (props) => {
    const [ display, setDisplay ] = useState(undefined);
    const [ user, setUser] = useState(props.user);
    const [ timer, setTimer ] = useState(20)
    const [ currentBet, setCurrentBet ] = useState(0);
    const [ value, setValue ] = useState(100);
    const [ turn, setTurn ] = useState(props.player.turn);
    
    const socket = useSelector((state) => state.socket.socket);


    //Event handlers ///////////////////////////////////////
    const fold = () => {
        console.log("fold")
        socket.emit("fold", { 
          id: props.player.id, 
        }); 
    };
    const check = () => {
        console.log("check")
        socket.emit("check", { 
          id: props.player.id, 
        }); 
    };
    const call = () => {
        console.log("call", currentBet)
        socket.emit("call", { 
          id: props.player.id, 
          bet: currentBet
        }); 
    };
    const betOrRise = (value) => {
        setCurrentBet(value);
        console.log("bet/rise", value)
        socket.emit("bet/rise", { 
          id: props.player.id, 
          bet: value
        }); 
    };
    
    // Turn timer
    useEffect(()=>{
        if (turn) {
            if (timer > 0) {
                setTimeout(function(){
                 setTimer(timer-1)
                 },1000) 
             } else {
                fold()
             }
        } 
    },[timer],[turn])

    // Display current user
    useEffect(()=>{
        if (props.player.name === user) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    },[])

    useEffect(()=>{
        if (!turn && display) {
            document.getElementById("fold").disabled = true;
            document.getElementById("rise/bet").disabled = true;
            document.getElementById("check/call").disabled = true;
        }
    },[display])

    
    // Need to add display current action

    //Betting input handler
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    //Betting input handler
    const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    //Betting input handler
    const handleBlur = () => {
    if (value < 0) {
        setValue(0);
    } else if (value > props.player.chips) {
        setValue(props.player.chips);
    }
    };
    // Betting popover
    const popover = (
        <Popover id="popover-positioned-top">
          <Popover.Header as="h3">Select the amount</Popover.Header>
          <Popover.Body>
            <Slider
                value={value}
                step={1000} 
                min={currentBet} 
                max={props.player.chips}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
            />
            <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                    step: 1000,
                    min: currentBet,
                    max: props.player.chips,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
            <button onClick={()=>betOrRise(value)}>Confirm</button>
          </Popover.Body>
        </Popover>
      );

    return (
        
        <div className={`players player${props.player.position}`}>
            <h5>{props.player.name}</h5>
            <div className="portrait">
                {props.player.turn ? (
                <CircularProgress className="timer" variant="determinate" value={timer*5} /> 
                ):(null)}
                <img src={props.player.portrait}/>
            </div>
            <div className="hand">
            {typeof display === 'boolean' ? (
                props.player.hand.map(card=>(
                <Card card={card} skin={props.player.skin} display={display}/>
                ))
            ):(null)
            }
            </div>

            <div className="chips">
                <img src={Chips}/>
                <p>${props.player.chips}</p>
            </div>

            {display ? (
            <>
            <div className="actions">
                <button id="fold" onClick={()=>fold()} >Fold</button>
                {currentBet === 0 ? (
                    <>
                    <button id="check/call" onClick={()=>check()} >Check</button>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button id="rise/bet" >Bet</button>
                    </OverlayTrigger>
                    </>
                ):(
                    <>
                    <button id="check/call" onClick={()=>call()} >Call</button>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button id="rise/bet" >Rise</button>
                    </OverlayTrigger>
                    </>
                )}
                
            </div>
            </>
            ):(null)}
            
        </div>
    );
};

export default Player;
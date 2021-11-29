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
    // const [ turn, setTurn ] = useState(props.player.turn);
    
    const socket = useSelector((state) => state.socket.socket);

    //Event handlers ///////////////////////////////////////
    const fold = () => {
        console.log("fold")
        socket.emit("fold",props.player.id); 
    };
    const check = () => {
        console.log("check",props.player.id)
        socket.emit("check",props.player.id); 
    };
    const call = () => {
        console.log("call", currentBet)
        socket.emit("call",props.player.id); 
    };
    const betOrRise = (value) => {
        setCurrentBet(value);
        console.log("bet/rise", value)
        socket.emit("bet/rise",{
            id:props.player.id,
            value
        }); 
    };
    
    // Turn timer

    useEffect(()=>{
        if (props.player.turn) {
            console.log("timer:", timer)
            if (timer > 0) {
                setTimeout(function(){
                    setTimer(timer-1)
                },1000) 
            } else {
                fold();
                setTimer(20)
            }
        }
    },[timer])

    useEffect(()=>{
        if (props.player.turn){
            setTimer(20)
        } else {
            setTimer(undefined)
        }
    },[props.player.turn])

    // Display current user
    useEffect(()=>{
        if (props.player.name === user) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    },[])

    useEffect(()=>{
        if (typeof props.player.turn === 'boolean') {
            document.getElementById(`fold${props.player.id}`).disabled = !props.player.turn;
            document.getElementById(`rise/bet${props.player.id}`).disabled = !props.player.turn;
            document.getElementById(`check/call${props.player.id}`).disabled = !props.player.turn;
        }
    },[props.player.turn])

    
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

            {/* {display ? ( */}
            <>
            <div className="actions">
                <button id={`fold${props.player.id}`} onClick={()=>fold()} >Fold</button>
                {currentBet === 0 ? (
                    <>
                    <button id={`check/call${props.player.id}`} onClick={()=>check()} >Check</button>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button id={`rise/bet${props.player.id}`}>Bet</button>
                    </OverlayTrigger>
                    </>
                ):(
                    <>
                    <button id={`check/call${props.player.id}`} onClick={()=>call()} >Call</button>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button id={`rise/bet${props.player.id}`} >Rise</button>
                    </OverlayTrigger>
                    </>
                )}
                
            </div>
            </>
            {/* ):(null)} */}
            
        </div>
    );
};

export default Player;
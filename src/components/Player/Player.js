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
    const [ value, setValue ] = useState(100)
    
    const socket = useSelector((state) => state.socket.socket);

    useEffect(()=>{
        if (timer > 0) {
           setTimeout(function(){
            setTimer(timer-1)
            },1000) 
        }
    },[timer])

    // useEffect (()=> {
    //     socket.emit("register", { 
    //         username: credentials.username, 
    //         email: credentials.email, 
    //         confirmPassword: credentials.confirmPassword
    //       });
      
    //       // listens for registration result from server
    //       socket.on("registration_result", (result) => {
    //         console.log("registration result", result);
    // },[])
    useEffect(()=>{
        if (props.player.name === user) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    },[])

    // need to add timer
    // current action
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
    if (value < 0) {
        setValue(0);
    } else if (value > props.player.chips) {
        setValue(props.player.chips);
    }
    };

    const popover = (
        <Popover id="popover-positioned-top">
          <Popover.Header as="h3">Select the amount</Popover.Header>
          <Popover.Body>
            <Slider
                value={value}
                step={1000} 
                marks 
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
            <button onClick={()=>setCurrentBet(value)}>Confirm</button>
          </Popover.Body>
        </Popover>
      );

    return (
        
        <div className={`players player${props.player.position}`}>
            <p>{props.player.name}</p>
            <img className="portrait" src={props.player.portrait}/>
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
            <CircularProgress className="timer" variant="determinate" value={timer*5} />
            <div className="actions">
                <button className="fold">Fold</button>
                {currentBet === 0 ? (
                    <>
                    <button className="check/call">Check</button>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button>Bet</button>
                    </OverlayTrigger>
                    </>
                ):(
                    <>
                    <button className="check/call">Call</button>//call or check
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <button>Rise</button>
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
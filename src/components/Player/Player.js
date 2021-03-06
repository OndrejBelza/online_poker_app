import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Chips from "../../icons/poker-chips.png";
import "./Player.scss";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover, Overlay } from "react-bootstrap";
import Slider from '@mui/material/Slider';
import { CircularProgress, Input, stepClasses } from "@mui/material";
import { BsCheckLg } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GoArrowUp } from "react-icons/go";

const Player = (props) => {
    const [ display, setDisplay ] = useState(undefined);
    const [ timer, setTimer ] = useState(20)
    const [ value, setValue ] = useState();

    // const [ action, setAction ] = useState();
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

  
    useEffect(()=>{
        setValue(props.table.currentRoundBet+props.table.blind)
    },[props])
    

    const socket = useSelector((state) => state.socket.socket);

    //Event handlers ///////////////////////////////////////
    const fold = () => {
        console.log("fold")
        socket.emit("fold",{roomId:props.table.id, id:props.player.id}); 
    };
    const check = () => {

        console.log("check",props.player.id)
        socket.emit("check",{roomId:props.table.id, id:props.player.id}); 
    };
    const call = () => {

        // console.log("call", props.table.current_bet)
        socket.emit("call",{roomId:props.table.id, id:props.player.id}); 
    };
    const betOrRise = (value) => {
        
        // setPlayerBet(value);
        console.log("bet/rise", value)
        socket.emit("bet/rise",{
            roomId:props.table.id, 
            id:props.player.id,
            value
        }); 
    };
    const allIn = () => {
        setValue(props.player.chips)
    }
    
    // Turn timer

    // useEffect(()=>{
    //     if (props.player.turn) {
    //         if (timer > 0) {
    //             setTimeout(function(){
    //                 setTimer(timer-1)
    //             },1000) 
    //         } else {
    //             fold();
    //             setTimer(20)
    //         }
    //     }
    // },[timer])

    useEffect(()=>{
        console.log(props.player.current_action)
        if (props.player.current_action === "fold") {
            document.getElementById(`player${props.player.position}`).style.opacity = 0.3;
        } else {
            document.getElementById(`player${props.player.position}`).style.opacity = 1;
        }
        // if (props.player.turn){
        //     setTimer(20)
        // } else {
        //     setTimer(undefined)
        // }
    },[props])

    // Display current user
    useEffect(()=>{
        if (props.player.id === props.table.currentPlayerId) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }

    },[])


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

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
      };
    const popover =
        <Overlay
            show={show}
            target={target}
        >
            <Popover id="popover-positioned-top" show={show}>
            <Popover.Header as="h3">Select the amount</Popover.Header>
            <Popover.Body>
                <Slider
                    value={value}
                    step={props.table.blind} 
                    min={props.table.currentRoundBet+props.table.blind} 
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
                        step: props.table.blind,
                        min: (props.table.currentRoundBet+props.table.blind),
                        max: props.player.chips,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
                <button onClick={()=>allIn()}>All In</button>
                <button onClick={()=>{
                    betOrRise(value);
                    setShow(false)
                    }} >Confirm</button>
            </Popover.Body>
            </Popover>
        </Overlay>

    return (

        <div id={`player${props.player.position}`} className="players">
            <div className="playerContainer">
                <h5>{props.player.username}</h5>
                <div className="portrait">
                    {/* {props.player.turn ? (
                    <CircularProgress className="timer" variant="determinate" value={timer*5} /> 
                    ):(null)} */}
                    {/* <img src={props.player.portrait}/> */}
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>
                </div>
                <div className="hand">
                {typeof display === 'boolean' && props.player.hand? (
                    props.player.hand.map((card,index)=>(
                    <Card key={props.player.id + index} card={card} display={display}/>
                    ))
                ):(null)
                }
                </div>

                <div className="chips">
                    <img src={Chips}/>
                    <p>${props.player.chips}</p>
                </div>
            </div>
            <div className="currentAction">
                { 
                (() => { 
                switch(props.player.current_action) {
                    case "check":
                        return <BsCheckLg/>
                    case "call":
                        return <span>C</span>
                    case "fold":
                        return <ImCross/>
                    case "bet/rise":
                        return <GoArrowUp/>
                    default:
                        return null;
                    }
                })()
                }{
                props.player.current_bet ? (
                    <span>${props.player.current_bet}</span>
                ):(null) 
                }
            </div>
            {display ? (
            <div className="actions">
                <div>
                    <button id={`fold${props.player.id}`} onClick={()=>fold()} disabled={!props.player.turn}><ImCross/></button>
                    <p>Fold</p>
                </div>
                {props.table.currentRoundBet === 0 ? (
                    <>
                    <div>
                        <button id={`check/call${props.player.id}`} onClick={()=>check()} disabled={!props.player.turn}><BsCheckLg/></button>
                        <p>Check</p>
                    </div>
                    <div>
                            <button id={`rise/bet${props.player.id}`} onClick={handleClick} disabled={!props.player.turn}><GoArrowUp /></button>
                        <p>Bet</p>
                        {popover}
                    </div>
                    </>
                ):(
                    <>
                    <div>
                        <button id={`check/call${props.player.id}`} onClick={()=>call()} disabled={!props.player.turn}>C</button>
                        <p>Call</p>
                    </div>
                    <div>
                            <button id={`rise/bet${props.player.id}`} onClick={handleClick} disabled={!props.player.turn}><GoArrowUp/></button>
                        <p>Rise</p>
                        {popover}
                    </div>
                    </>
                )}
            </div>
            ):(null)}
            
        </div>
    );
};

export default Player;
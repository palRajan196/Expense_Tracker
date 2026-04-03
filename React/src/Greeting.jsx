import { useState } from "react";
import './App.css';
function Greeting(){

    function greet(){
    const hours = new Date().getHours();
    if(hours < 12 && hours >= 3) return "Good Morning";
    if(hours < 17) return "Good Afternoon";
    if(hours < 21) return "Good Evening";
    return "Good Night";
    }

    return(
        <div id="Heading">
            {greet()}
        </div>
    )
}

export default Greeting;
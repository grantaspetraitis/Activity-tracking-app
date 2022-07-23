import { useState } from "react";

const Activity = (props) => {

    const [clicked, setClicked] = useState(false);

    const onClick = e => {
        e.preventDefault()
        setClicked(state => !state)
    }

    return (
        <button onClick={onClick} className={clicked ? 'btn-clicked' : 'btn-unclicked'}>{props.data}</button>
    );
}
 
export default Activity;
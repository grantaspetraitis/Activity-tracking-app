import { useContext, useState } from "react";

const ActivityCategory = (props) => {

    const [clicked, setClicked] = useState(false);

    const onClick = async (e) => {
        e.preventDefault()
        setClicked(state => !state)
        props.getCategory(e.target.id)
        props.fetchActivities(e.target.id)
    }

    return (
        <button id={props.id} name="title" onClick={onClick} className={clicked ? 'btn-clicked' : 'btn-unclicked'}>{props.data}</button>
    );
}

export default ActivityCategory;
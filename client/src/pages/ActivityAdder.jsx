import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";
import Slider from '@mui/material/Slider'

const ActivityAdder = () => {

    const navigate = useNavigate();
    const { login } = useContext(AppContext);

    const [formData, setFormData] = useState({
        activity_title: '',
        activity_duration: '',
        activity_result: '',
        mood: ''
    })
    const [categories, setCategories] = useState(null)

    const { title, duration, result, mood } = formData;

    const fetchActivities = async () => {
        const response = await fetch('/categories');
        const json = await response.json();
        console.log(json)
        setCategories(json);
    }

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        const activityData = {
            title: e.target.title.value,
            duration: e.target.duration.value,
            result: e.target.result.value,
            mood: e.target.mood.value
        }

        const response = await fetch('/addactivity', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login ? login.token : ''}`
            },
            body: JSON.stringify(activityData)
        })

        const json = await response.json();
        if(response.ok) {
            toast.success('Added activity successfully!')
            navigate('/activities')
        } else {
            toast.error(json.error)
        }
    }

    useEffect(() => {
        fetchActivities();
    }, [])


    return (
        <form className="activity-form" onSubmit={onSubmit}>
            <div className="form-element">
                {/* <input required className="input" type="text" value={title} placeholder="Enter activity name" onChange={onChange} name="title"></input> */}
                <select onChange={onChange}>
                    {categories && categories.map(category => <option value={category.activity_category}>{category.activity_category}</option>)}
                </select>
                <Slider 
                    size="small"
                    dafaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </div>
        </form>
    );
}
 
export default ActivityAdder;
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";
import Slider from '@mui/material/Slider'
import ActivityCategory from "../components/ActivityCategory";
import Activity from "../components/Activity";

const ActivityAdder = () => {

    const navigate = useNavigate();
    const { login } = useContext(AppContext);

    const [formData, setFormData] = useState({
        activity_title: '',
        activity_duration: '',
        activity_result: '',
        mood: ''
    })
    const [categories, setCategories] = useState(null);
    const [activities, setActivities] = useState(null);
    const [moodStep, setMoodStep] = useState(false);
    const [category, setCategory] = useState(null);

    const { title, duration, result, mood } = formData;

    const fetchActivityCategories = async () => {
        const response = await fetch('/categories');
        const json = await response.json();
        setCategories(json);
    }

    const fetchActivities = async (category) => {
        const response = await fetch(`/activities/${category}`)
        const json = await response.json();
        setActivities(json)
    }

    const getCategory = (value) => {
        setCategory(value);
    }

    const onClickNext2 = e => {
        e.preventDefault();
        setMoodStep(true);
    }

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // const onSubmitCategory = async e => {
    //     e.preventDefault();
    //     console.log(e.target.title)
    //     setCategory(e.target.title.value)
    // } 

    const onSubmit = async (e) => {
        const activityData = {
            title: e.target.title.value,
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
        if (response.ok) {
            toast.success('Added activity successfully!')
            navigate('/activities')
        } else {
            toast.error(json.error)
        }
    }

    useEffect(() => {
        fetchActivityCategories();
        // fetchActivities(category);
    }, [])


    return (
        <>

            <h1 className="header">Select the category of your activity</h1>
            <form className="activity-form">
                <div className="form-element">
                    {categories && categories.map((category, i) => <ActivityCategory key={i} id={category.category_id} fetchActivities={fetchActivities} getCategory={getCategory} data={category.category_name}></ActivityCategory>)}
                </div>
                {/* <div className="form-element">
                    <button className="btn">Next</button>
                </div> */}
            </form>
            {category &&
                <>
                    <h1 className="header2">Select activity</h1>
                    <form className="activity-form">
                        <div className="form-element">
                            {activities && activities.map((activity, i) => <Activity key={i} data={activity.activity_title}></Activity>)}
                        </div>
                        <div className="form-element">
                            <button className="btn" onClick={onClickNext2}>Next</button>
                        </div>
                    </form>
                </>
            }
            {moodStep &&
                <>
                    <h1 className="header2">Result and mood</h1>
                    <form className="activity-form" onSubmit={onSubmit}>
                        <div className="form-element">
                            <input type="number" onChange={onChange} name={duration} className="input" placeholder="Activity duration in minutes"></input>
                        </div>
                        <div className="form-element">
                            <label>Mood</label>
                            <Slider
                                aria-label="Small"
                                valueLabelDisplay="auto"
                                color="secondary"
                                style={{ width: 200 }}
                            />
                        </div>

                        <button className="btn">Submit</button>
                    </form>
                </>
            }
        </>
    );
}

export default ActivityAdder;
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ActivityCategory from "../components/ActivityCategory";
import { AppContext } from "../Context";

const NewActivity = () => {

    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: '',
        category: ''
    })
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [activities, setActivities] = useState(null);

    const { title, cat } = formData;

    const fetchActivityCategories = async () => {
        const response = await fetch('/categories');
        const json = await response.json();
        setCategories(json);
    }

    const onSubmit = async e => {
        e.preventDefault();
        await fetch('/addnewactivity', {
            method: 'POST',
            headers: {
                "Content-Type": "application-json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify()
        })
    }

    const getCategory = (value) => {
        setCategory(value);
    }

    
    const fetchActivities = async (category) => {
        const response = await fetch(`/activities/${category}`)
        const json = await response.json();
        setActivities(json)
    }

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        fetchActivityCategories();
    })


    return (
        <form onSubmit={onSubmit} className="form" style={{ marginTop: 200 }}>
            <div className="form-element">
                <input className="input" value={title} type="text" onChange={onChange} placeholder="Name of the activity"></input>
            </div>
            <div className="form-element">
                <h3 className="header2">Choose category</h3>
                {categories && categories.map((category, i) => <ActivityCategory key={i} id={category.category_id} fetchActivities={fetchActivities} getCategory={getCategory} data={category.category_name}></ActivityCategory>)}
            </div>
            <button className="btn">Submit</button>
        </form>
    );
}

export default NewActivity;
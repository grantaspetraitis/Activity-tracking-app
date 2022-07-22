import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../Context";
import toast from "react-hot-toast";
import ProfileActivityCard from "../components/ProfileActivityCard";

const Profile = () => {

    const [data, setData] = useState(null);

    const { login } = useContext(AppContext);

    const fetchData = async () => {
        const response = await fetch('/profile', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        })
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            {login ? (
                <>
                    <h2 style={{ marginTop: 200, marginLeft: 50 }}>Hi, {login.username}!</h2>
                    <div className="profile-activity-container">
                        <h3 style={{ padding: 20 }}>Your recent activities:</h3>
                        {
                            data ? data.map((data, i) => <ProfileActivityCard key={i} data={data}></ProfileActivityCard>) : <div className="spinner"></div>
                        }
                    </div>
                </>
            ) :
                toast.error('You must be logged in to view this page')
            }
        </>
    );
}

export default Profile;
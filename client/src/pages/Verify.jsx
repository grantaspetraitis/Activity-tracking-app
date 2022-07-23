import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {

    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const params = useParams();
    const verify = async () => {
        const response = await fetch(`/verify/${params.token}`)
        const json = await response.json();
        if(json.success){
            setIsVerified(true);
            navigate('/login');
        } else {
            toast.error(json.error);
        }
    }

    useEffect(() => {
        verify();
    }, [])

    return (
        <>
            {
                isVerified && <h1>Successfully verified email. Redirecting to login page...</h1>
            }
        </>
    );
}
 
export default Verify;
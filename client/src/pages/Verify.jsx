import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Verify = () => {

    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const params = useParams();
    const verify = async () => {
        const response = await fetch(`http://localhost:5001/verify/${params.token}`)
        const json = await response.json();
        setIsVerified(json.success)
    }

    useEffect(() => {
        verify();
    }, [])

    console.log(isVerified)

    return (
        <>
            {
                isVerified && <h1>Successfully verified email. Redirecting to login page...</h1>
            }
        </>
    );
}
 
export default Verify;
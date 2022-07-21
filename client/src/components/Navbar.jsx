import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';


const Navbar = () => {

    const { login, setLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = () => {
        setLogin(null);
        navigate('/login');
    }

    return (
        <nav className="navbar-container">
            <h1 style={{ color: "white", paddingLeft: 20, fontSize: "2em" }}>Debree</h1>
            <ul className="navbar">
                {login ? (
                    <>
                        <li>
                            <Link to="/activity">Your activities</Link>
                        </li>
                        <li>
                            <Link to="/profile">My profile</Link>
                        </li>
                        <li>
                            <span style={{ cursor: "pointer" }} onClick={logout}>Log out</span>
                        </li>

                    </>

                ) : (
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}


            </ul>
        </nav>
    );
}

export default Navbar;
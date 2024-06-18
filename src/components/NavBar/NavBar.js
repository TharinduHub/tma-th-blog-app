import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import './navbar.css';

function NavBar() {
    const [user, setUser] = useState("");
    
    const onSignOut = async () => {
        await signOut();
    }

    const loadUser = async () => {
        const { signInDetails } = await getCurrentUser();
        setUser(signInDetails.loginId);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>{user}</li>
                <li>
                    <Link onClick={onSignOut}>Sign Out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
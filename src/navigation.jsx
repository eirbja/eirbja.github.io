import React from 'react';
import { Link } from 'react-scroll';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <ul>
                <li><Link to="homeNav" smooth={true} duration={30} className="nav_link">Home</Link></li>
                <li><Link to="projectsNav" smooth={true} duration={30} className="nav_link">Projects</Link></li>
                <li><Link to="cvNav" smooth={true} duration={30} className="nav_link">CV</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
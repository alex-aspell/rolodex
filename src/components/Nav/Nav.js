import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/profile">
            Your Profile
          </Link>
        </li>
        <li>
          <Link to="/update">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;

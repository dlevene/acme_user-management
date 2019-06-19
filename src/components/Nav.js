import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
       return (
       <div id="navbar" className="column">
           <NavLink to="/users" >Users ({props.userCount})</NavLink>
           <NavLink to="/managers" >Managers ({props.managerCount})</NavLink>
           <NavLink to="/users/create" >Create New User</NavLink>
       </div>
       )
   }

   export default Nav;

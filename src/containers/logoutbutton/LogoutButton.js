import React from 'react'

const LogOutButton = ({ onLogoutUserClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLogoutUserClick(event)}>Logout</a>
    </li>
  )
}

export default LogOutButton

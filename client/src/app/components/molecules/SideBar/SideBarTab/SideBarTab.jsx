import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const SideBarTab = ({tab}) => {
  return (
    <li className={`${tab.activeClass ? 'active' : ''} c-SideBarTab` }>
      <Link to={tab.href}>
        <i className={`fas ${tab.tabImage}`}></i>
        <span className="hideable hide">{tab.tabText}</span>
      </Link>
      {tab.subList && (<ul 
        className="collapse list-unstyled" 
        id="pageSubmenu">
        <li>
          <Link to="#">Repo</Link>
        </li>
        <li>
          <Link to="#">Issues</Link>
        </li>
        <li>
          <Link to="#">Admin</Link>
        </li>
      </ul>)}
    </li>
  );
};

SideBarTab.propTypes = {
  tab: PropTypes.object
};

export default SideBarTab;
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const SideBarTab = ({tab}) => {
  return (
    <li className={tab.activeClass ? 'active' : ''}>
      <Link href={tab.href}>
        <i className={`fas ${tab.tabImage}`}></i>
        <span className="hideable hide">{tab.tabText}</span>
      </Link>
      {tab.subList && (<ul 
        className="collapse list-unstyled" 
        id="pageSubmenu">
        <li>
          <Link href="#">Repo</Link>
        </li>
        <li>
          <Link href="#">Issues</Link>
        </li>
        <li>
          <Link href="#">Admin</Link>
        </li>
      </ul>)}
    </li>
  );
};

SideBarTab.propTypes = {
  tab: PropTypes.object
};

export default SideBarTab;
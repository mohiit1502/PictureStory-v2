import React from 'react';
import PropTypes from 'prop-types';
import SideBarTab from './SideBarTab';

const SideBar = props => {
  const tabsData = [
    {'href': 'homeSubmenu', 'tabImage': 'fa-home', 'tabText': 'Home', 'activeClass': true, 'subList': false},
    {'href': 'about', 'tabImage': 'fa-briefcase', 'tabText': 'About', 'activeClass': false, 'subList': false},
    {'href': 'pageSubmenu', 'tabImage': 'fa-copy', 'tabText': 'Tasks', 'activeClass': false, 'subList': true},
    {'href': 'favorites', 'tabImage': 'fa-image', 'tabText': 'Favorites', 'activeClass': false, 'subList': false},
    {'href': 'question', 'tabImage': 'fa-question', 'tabText': 'FAQ', 'activeClass': false, 'subList': false},
    {'href': 'contact', 'tabImage': 'fa-paper-plane', 'tabText': 'Contact', 'activeClass': false, 'subList': false},
  ]
  const tabItems = tabsData && tabsData.map((tab) => {
    return <SideBarTab tab={tab} />
  })
  return (
    <div className="c-SideBar">
      <nav id="sidebar" class="active">
        <div class="sidebar-header">
          <button type="button" id="sidebarCollapse" class="btn btn-info">
            <i class="fas fa-align-justify"></i>
          </button>
          <h3 class="logotext">Microbot</h3>
        </div>
        <ul class="list-unstyled components">
          {tabItems}
        </ul>
      </nav>
    </div>
  )
};


SideBar.propTypes = {
  tabsData: PropTypes.array
};

export default SideBar;
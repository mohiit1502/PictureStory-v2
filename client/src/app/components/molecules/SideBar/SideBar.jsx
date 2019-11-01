import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import SideBarTab from './SideBarTab';
import $ from 'jquery'

const SideBar = props => {

  useEffect(() => {
    $('#sidebar.active > span').on('click', () => {
      $('#sidebar').css('transform', 'translateX(85px)');
      $('#sidebar').css('box-shadow', 'rgb(224, 151, 32) 10px 10px 30px');
      $('.triangle').removeClass('animation');
    });
    $('*').on('click', (e) => {
      // e.stopPropagation();
      // console.log($(e.target).closest('#sidebar'))
      if($(e.target).closest('#sidebar').length === 0) {
        $('#sidebar').css('transform', 'translateX(0px)');
        $('#sidebar').css('box-shadow', '');
        $('.triangle').addClass('animation');
      }
    })
  })

  const toggleSidebar = () => {
    const position = $('#sidebar').css('transform').split(/[()]/)[1]
    const currentX = +position.split(',')[4]
    if (currentX && currentX === 255) {
      $('#sidebar').css('transform', 'translateX(85px)');
    } else if (currentX && currentX === 85) {
      $('#sidebar').css('transform', 'translateX(255px)');
    }
    $('#sidebar').toggleClass('active');
    $('.hideable').toggleClass('hide');
    // console.log(currentX)
    // console.log($('#sidebar').css('transform'))
    // console.log($('#sidebar').css('transform').split(/[()]/))
    $('.triangle').addClass('animation');
  }

  const tabsData = [
    {'href': 'homeSubmenu', 'tabImage': 'fa-home', 'tabText': 'Home', 'activeClass': true, 'subList': false},
    {'href': 'about', 'tabImage': 'fa-briefcase', 'tabText': 'About', 'activeClass': false, 'subList': false},
    {'href': 'pageSubmenu', 'tabImage': 'fa-copy', 'tabText': 'Tasks', 'activeClass': false, 'subList': true},
    {'href': 'favorites', 'tabImage': 'fa-image', 'tabText': 'Favorites', 'activeClass': false, 'subList': false},
    {'href': 'question', 'tabImage': 'fa-question', 'tabText': 'FAQ', 'activeClass': false, 'subList': false},
    {'href': 'contact', 'tabImage': 'fa-paper-plane', 'tabText': 'Contact', 'activeClass': false, 'subList': false},
  ]
  const tabItems = tabsData && tabsData.map((tab, index) => {
    return <SideBarTab tab={tab} key={index} />
  })
  return (
    <nav id="sidebar" className="c-SideBar active">
      <span className="triangle animation" id="pullOutButton"></span>
      <div className="sidebar-header">
        <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={toggleSidebar}>
          <i className="fas fa-align-justify"></i>
        </button>
        <h3 className="logotext">Ecstatica</h3>
      </div>
      <ul className="list-unstyled components">
        {tabItems}
      </ul>
    </nav>
  )
};

SideBar.propTypes = {
  tabsData: PropTypes.array
};

export default SideBar;
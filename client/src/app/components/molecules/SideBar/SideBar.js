import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.scss';

const SideBar = props => {
  // return (
  //   <nav id="sidebar" class="active">
  // <div class="sidebar-header">
  //   <button type="button" id="sidebarCollapse" class="btn btn-info">
  //     <i class="fas fa-align-justify"></i>
  //   </button>
  //   <h3 class="logotext">Microbot</h3>
  //   <!-- <strong>MB</strong> -->
  // </div>

  // <ul class="list-unstyled components">
  //   <li *ngFor="let tab of tabsData"
  //       [ngClass]="{active: tab.activeClass}">
  //     <a [routerLink]="tab.href">
  //       <i [ngClass]="['fas', tab.tabImage]"></i>
  //       <span class="hideable hide">{{tab.tabText}}</span>
  //     </a>
  //     <ul 
  //       class="collapse list-unstyled" 
  //       id="pageSubmenu"
  //       *ngIf="tab.subList">
  //       <li>
  //         <a href="#">Repo</a>
  //       </li>
  //       <li>
  //         <a href="#">Issues</a>
  //       </li>
  //       <li>
  //         <a href="#">Admin</a>
  //       </li>
  //     </ul>
  //   </li>
  //   </ul>
  //   </nav>
  // );
  return null
};

SideBar.defaultProps = {

};

SideBar.propTypes = {

};

export default SideBar;
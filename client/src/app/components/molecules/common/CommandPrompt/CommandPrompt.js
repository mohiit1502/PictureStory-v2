import React from 'react';
import $ from 'jquery'
import CommandAndUserTools from './CommandAndUserTools/CommandAndUserTools';
import {Link} from 'react-router-dom';

class CommandPrompt extends React.Component {

  constructor(props) {
    super(props)
    this.registerMouseAndKeyboardHandlers = this.registerMouseAndKeyboardHandlers.bind(this)
    this.showContextMenu = this.showContextMenu.bind(this)
    this.initiateDomOpsOnEnter = this.initiateDomOpsOnEnter.bind(this)
    this.timerId = 0
  }

  componentDidMount() {
    this.registerMouseAndKeyboardHandlers();
  }

  initiateDomOpsOnEnter(event, func, delay) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (code === 13) {
      func();
      clearTimeout(this.timerId)
      return
    }
    clearTimeout(this.timerId)
    this.timerId = setTimeout(func, delay)
  }

  saveToFavorites() {

  }

  resetCommand() {
    $('#command').val('');
    $('#command').focus();
  }

  registerMouseAndKeyboardHandlers() {
    $('*').on('click', (event) => {
      if(!this.contextMenuFirstDisplay) {
        $("#inputSelectionContextMenu").removeClass("show").hide();
        this.contextMenuDisplayed = false;
      } else {
        this.contextMenuFirstDisplay = false;
      }
    });
  }

  showContextMenu(event) {
    if(this.contextMenuDisplayed === true) {
      return;
    }
    var inputField = event.target;
    if(inputField.value.length > 2 && inputField.selectionStart === 0 && inputField.selectionEnd === inputField.value.length) {
      var top = event.pageY - 10;
      var left = event.pageX - 90;
      $("#inputSelectionContextMenu").css({
        display: "block",
        top: top,
        left: left
      }).addClass("show");
      this.contextMenuFirstDisplay = true;
      this.contextMenuDisplayed = true;
    }
  }

  executeCommand() {
    alert('called')
    // this.domOpsService.hideNonCards();
    let commandVal = $('#command').val();
    console.log(commandVal)
    if(!commandVal) {
      // this.domOpsService.showEmptyCommandMessage(this.emptyCommandMessage);
    } else {
      // let card = this.cardsService.getCommandCard($config.intentSlugToOperations.command.cardTitle, commandVal, {}, "command");
      // let commandAction = new Command(card);
      // this.store.dispatch(commandAction);
      // const text = { text: commandVal };
      // let recastResponse = this.recastOpsService.getRecastResponse(commandVal, text);
      // this.processRecastResponse(recastResponse);
    }
  }

  render() {
    return (
      <div id="header" className="c-CommandPrompt headerprompt" onDragEnd={this.showContextMenu}>
        <div className="prompt">
          <p className="promptext">$_</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="equalizer hide" viewBox="0 0 80 80">
            <rect className="bar" transform="translate(13,30)"></rect>
            <rect className="bar" transform="translate(25,30)"></rect>
            <rect className="bar" transform="translate(37,30)"></rect>
            <rect className="bar" transform="translate(49,30)"></rect>
            <rect className="bar" transform="translate(61,30)"></rect>
          </svg>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <input type="text" className="form-control" placeholder="What you need..."
              name="command" id="command" onKeyUp={(event) => this.initiateDomOpsOnEnter(event, this.executeCommand, 2000)}
              // onClick={showContextMenu} #command>
              onClick={this.showContextMenu} />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="inputSelectionContextMenu">
              <Link to="#" className="dropdown-item" onClick={this.executeCommand}>Fire</Link>
              <Link to="#" className="dropdown-item" onClick={this.resetCommand}>Clear</Link>
              <Link to="#" className="dropdown-item" onClick={this.saveToFavorites}>Add to Favorites</Link>
            </div>
            <CommandAndUserTools execute={this.executeCommand} reset={this.resetCommand} save={this.saveToFavorites} />
          </div>
        </nav>
        <input type="hidden" id="intentHidden" value="createissue" />
      </div>
    );
  }
}

export default CommandPrompt;
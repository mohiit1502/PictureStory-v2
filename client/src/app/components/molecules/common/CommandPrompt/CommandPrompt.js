import React from 'react';
import PropTypes from 'prop-types';
import * as $ from 'jquery'

class CommandPrompt extends React.Component {

  constructor(props) {
    super(props)
    this.registerSpeechHandlers = this.registerSpeechHandlers.bind(this)
    this.registerMouseAndKeyboardHandlers = this.registerMouseAndKeyboardHandlers.bind(this)
    this.showContextMenu = this.showContextMenu.bind(this)
    this.initiateDomOpsOnEnter = this.initiateDomOpsOnEnter.bind(this)
    this.startSpeechRecognition = this.startSpeechRecognition.bind(this)
  }

  componentDidMount() {
    this.registerSpeechHandlers();
    this.registerMouseAndKeyboardHandlers();
  }

  toggleClass(event) {
    $(event.target).toggleClass('fas');
  }

  initiateDomOpsOnEnter(event) {
    const code = (event.keyCode ? event.keyCode : event.which);
    if (code === 13) {
      // this.domOpsService.hideNonCards();
      this.executeCommand();
    }
  }

  resetCommand() {
    $('#command').val('');
    $('#command').focus();
  }

  startSpeechRecognition() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(isChrome) {
      this.recognition.start();
    } else {
      // this.domOpsService.sho
    }
  }

  registerSpeechHandlers() {
    let SpeechRecognition
    let instructions = $('#command')
    try {
      SpeechRecognition = window.SpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.webkitSpeechRecognition
      // SpeechRecognition = ''
      this.recognition = new SpeechRecognition()
    }
    catch(e) {
      console.error(e);
      $('.no-browser-support').show();
      $('.app').hide();
    }
    this.recognition.onstart = function() { 
      instructions.val('Voice recognition activated. Try speaking into the microphone.');
    }
    
    this.recognition.onspeechend = function() {
      instructions.val('You were quiet for a while so voice recognition turned itself off.');
    }
    
    this.recognition.onerror = function(event) {
      if(event.error === 'no-speech') {
        instructions.val('No speech was detected. Try again.');  
      };
    }

    this.recognition.onresult = function(event) {
      let noteContent = "";
      let current = event.resultIndex;    
      let transcript = event.results[current][0].transcript;
      let mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);
      if(!mobileRepeatBug) {
        noteContent += transcript;
        $('#command').val(noteContent);
      }
    }
  }

  registerMouseAndKeyboardHandlers() {
    $('#content nav div.collapse li a.nav-link i.far.fa-star').hover(() => {
      $('#content nav div.collapse li a.nav-link i.far.fa-star').toggleClass('fas');
    });
    $('#content nav div.collapse li a.nav-link i.far.fa-trash-alt').hover(() => {
      $('#content nav div.collapse li a.nav-link i.far.fa-trash-alt').toggleClass('fas');
    });
    $('#content nav div.collapse li a.nav-link i.far.fa-paper-plane').hover(() => {
      $('#content nav div.collapse li a.nav-link i.far.fa-paper-plane').toggleClass('fas');
    });
    $('*').on('click', (event) => {
      if(!this.contextMenuFirstDisplay) {
        $("#inputSelectionContextMenu").removeClass("show").hide();
        this.contextMenuDisplayed = false;
//         event.stopPropagation();
      } else {
        this.contextMenuFirstDisplay = false;
//         event.stopPropagation();
      }
    });
  }

  executeCommand() {
    // this.domOpsService.hideNonCards();
    // let commandVal = this.command.nativeElement.value;
    // if(!commandVal) {
    //   this.domOpsService.showEmptyCommandMessage(this.emptyCommandMessage);
    // } else {
    //   let card = this.cardsService.getCommandCard($config.intentSlugToOperations.command.cardTitle, commandVal, {}, "command");
    //   let commandAction = new Command(card);
    //   this.store.dispatch(commandAction);
    //   const text = { text: commandVal };
    //   let recastResponse = this.recastOpsService.getRecastResponse(commandVal, text);
    //   this.processRecastResponse(recastResponse);
    // }
  }

  // processRecastResponse(recastResponse: any) {
  //   let bodyRelevant: any;
  //   let intent: any = "";
  //   let assuredIntentFactor = 0.6;
  //   recastResponse.then((body) => {
  //     bodyRelevant = body.results;
  //     let intents = bodyRelevant ? bodyRelevant.intents : "";
  //     if(intents) {
  //       if(intents.length == 1) {
  //         intent = intents[0];
  //       } else if(intents.length > 1) {
  //         let reducer = (probableIntent, currIntent) => probableIntent.confidence >= currIntent.confidence ? probableIntent : currIntent;
  //         intent = intents.reduce(reducer, intents[0]);
  //       } else {
  //         this.domOpsService.showEmptyCommandMessage("Intent is either not Identified or is not supported, please try again with a different text.");
  //         return;
  //       }
  //       if (intent && intent.confidence > assuredIntentFactor) {
  //         let intentSlug = intent.slug;
  //         if (!Object.keys($config.intentSlugToOperations).includes(intentSlug)) {
  //           this.domOpsService.showEmptyCommandMessage("Intent is either not Identified or is not supported, please try again with a different text.");
  //           return;
  //         }
  //         // $(`#${$config.constants.hiddenIntentFieldId}`).val(intent);
  //         window.localStorage.setItem($config.constants.hiddenIntentFieldId, intentSlug);
  //         this.domOpsService.displayIntentBox(intentSlug);
  //         if (intentSlug == "resethistory") {
  //           let card = this.cardsService.getResponseCard($config.intentSlugToOperations.resethistory.cardTitle, 
  //             $config.intentSlugToOperations.resethistory.cardMsg, {}, "response");
  //           card.insertionCounter = 0;
  //           let resetHistoryResponseAction = new ClearHistory(card);
  //           this.store.dispatch(resetHistoryResponseAction);
  //           return;
  //         }
  //         this.domOpsService.widgetIdentified.emit({widget: intentSlug, bodyRelevant: bodyRelevant});
  //         this.domOpsService.populateRecastData(intentSlug, bodyRelevant);
  //         // store.dispatch($config.intentSlugToOperations.addquery.action);
  //       } else  {
  //         this.domOpsService.showEmptyCommandMessage("Couldn't conform with the required confidence level of the intent match, please try again.");
  //       }
  //     } else {
  //       this.domOpsService.showEmptyCommandMessage("There seems to be an error in the Recast Response, as intents are not returned.");
  //       return;
  //     }
  //   });
    
  // }

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
              name="command" id="command" onKeyUp={this.initiateDomOpsOnEnter}
              // onClick={showContextMenu} #command>
              onClick={this.showContextMenu} />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="inputSelectionContextMenu">
              <a className="dropdown-item">Fire</a>
              <a className="dropdown-item" onClick={this.resetCommand}>Clear</a>
              <a className="dropdown-item">Add to Favorites</a>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li id="btnFavorites" className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-star" onMouseEnter={this.toggleClass} onMouseLeave={this.toggleClass}></i>
                  </a>
                </li>
                <li id="btnClearCommand" className="nav-item" onClick={this.resetCommand}>
                  <a className="nav-link">
                    <i className="far fa-trash-alt" onMouseEnter={this.toggleClass} onMouseLeave={this.toggleClass}></i>
                  </a>
                </li>
                <li id="btnFireCommand" className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-paper-plane" onMouseEnter={this.toggleClass} onMouseLeave={this.toggleClass}></i>
                  </a>
                </li>
                <li id="btnSTTCommand" className="nav-item" onClick={this.startSpeechRecognition}>
                  <a className="nav-link">
                    <i className="far fa-microphone fas"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <input type="hidden" id="intentHidden" value="createissue" />
      </div>
    );
  }
}

CommandPrompt.propTypes = {

};

export default CommandPrompt;
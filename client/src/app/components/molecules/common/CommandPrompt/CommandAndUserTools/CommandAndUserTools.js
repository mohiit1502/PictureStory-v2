import React from 'react';
import $ from 'jquery'
import PropTypes from 'prop-types';
import ToolItem from './ToolItem/ToolItem';
import UserTools from './UserTools/UserTools';

class CommandAndUserTools extends React.Component {
  constructor(props) {
    super(props)
    this.registerSpeechHandlers = this.registerSpeechHandlers.bind(this)
    this.startSpeechRecognition = this.startSpeechRecognition.bind(this)
    this.state = {
      commandToolItemsData: [
        {
          id: 'btnFavorites',
          icon: 'star_border',
          iconHovered: 'star',
          clickHandler: this.props.save
        },
        {
          id: 'btnClearCommand',
          icon: 'delete_outline',
          iconHovered: 'delete',
          clickHandler: this.props.reset
        },
        {
          id: 'btnFireCommand',
          icon: 'send',
          iconHovered: 'send',
          clickHandler: this.props.execute
        },
        {
          id: 'btnSTTCommand',
          icon: 'mic_none',
          iconHovered: 'mic',
          clickHandler: this.startSpeechRecognition
        }
      ]
    }
  }

  componentDidMount() {
    this.registerSpeechHandlers();
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

  render() {
    const {commandToolItemsData} = this.state

    const commandToolItems = commandToolItemsData && commandToolItemsData.map((toolData, index) => {
      return <ToolItem toolData={toolData} key={index} />
    })
    return (
      <div className="collapse navbar-collapse c-CommandAndUserTools" id="navbarSupportedContent">
        <ul className="nav navbar-nav ml-auto c-commandTools">
          {commandToolItems}
        </ul>
        <UserTools />
      </div>
    );
  }
}

CommandAndUserTools.propTypes = {
  execute: PropTypes.func,
  reset: PropTypes.func,
  save: PropTypes.func
};

export default CommandAndUserTools;
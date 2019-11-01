import React from 'react';
import {withRouter} from 'react-router-dom'
import {gapi} from 'gapi-script'

class SocialLogin extends React.Component{

  constructor(props) {
    super(props)
    this.width = 254
    this.height = 50
    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)
  }

  componentDidMount() {
    gapi && gapi.signin2 && gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'width': this.width,
      'height': this.height,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });  
  }

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    this.props.history.push('/home')
  }

  onFailure(error) {
    console.log(error);
  }

  render() {
    return (
      <div className='c-SocialLogin'>
        <div className="row">
          <div className="col-12">
            <div className="g-signin2" id="g-signin2"></div>
          </div>
          <div className="col-12">
            <div 
              className="fb-login-button"
              data-width={this.width}
              data-height={this.height}
              data-size="large"
              data-button-type="continue_with"
              data-auto-logout-link="false"
              data-use-continue-as="true"
            />
          </div>
        </div>
      </div>
    );
  }
}

SocialLogin.defaultProps = {

};

SocialLogin.propTypes = {

};

export default withRouter(SocialLogin)
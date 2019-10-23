import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Jumbotron = props => {
  return (
    <div className='c-Jumbotron'>
      <h1 className="display-4">{props.jumboText}</h1>
      <p className="lead">{props.subText}</p>
      <hr className='my-4' />
      <p>{props.jumboDescription}</p>
      <p className="lead">
        <Link className="btn btn-primary btn-lg" to="#" role="button">Let's get started</Link>
        <Link className="btn btn-primary btn-lg float-right" to="#" role="button" style={{marginLeft: '15px'}}>{props.furtherLink}</Link>
      </p>
    </div>
  );
};

Jumbotron.propTypes = {
  furtherLink: PropTypes.string,
  jumboDescription: PropTypes.string,
  jumboText: PropTypes.string,
  subText: PropTypes.string
};

export default Jumbotron;
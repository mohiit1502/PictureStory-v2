import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getImages} from './../../../../pages/Home/selectors'
import ImageCard from './Image'
import Image from './../../../../models/image.model'

class ImageContainer extends React.Component {

  render() {
    const {images} = this.props
    const imageRenders = images && images.map((image, index) => {
      return <ImageCard image={image} key={index} />
    })
    return (
      <div className="container-fluid c-ImageContainer">
        <div className="row c-Images">
          {imageRenders}
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  images: PropTypes.array
};

const mapStateToProps = createPropsSelector({
  images: getImages
})

export default connect(
  mapStateToProps,
  null
)(ImageContainer)
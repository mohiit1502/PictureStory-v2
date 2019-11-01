import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './Image'
import Image from './../../../../models/image.model'

class ImageContainer extends React.Component {

  render() {
    const images = [
      new Image('dragonfly1', '/images/GUD_1.JPG', 'Guddu 1'),
      new Image('dragonfly2', '/images/GUD_2.JPG', 'sampleDesc2'),
      new Image('dragonfly3', '/images/GUD_3.JPG', 'sampleDesc3'),
      new Image('dragonfly4', '/images/GUD_4.JPG', 'sampleDesc4'),
      new Image('dragonfly1', '/images/GUD_5.JPG', 'sampleDesc1'),
      new Image('dragonfly2', '/images/GUD_6.JPG', 'sampleDesc2'),
      new Image('dragonfly3', '/images/GUD_7.JPG', 'sampleDesc3'),
      new Image('dragonfly4', '/images/GUD_8.JPG', 'sampleDesc4'),
      new Image('dragonfly1', '/images/GUD_9.JPG', 'sampleDesc1'),
      new Image('dragonfly2', '/images/GUD_10.JPG', 'sampleDesc2'),
      new Image('dragonfly3', '/images/GUD_11.JPG', 'sampleDesc3'),
      new Image('dragonfly4', '/images/GUD_12.JPG', 'sampleDesc4'),
      new Image('dragonfly1', '/images/GUD_4.JPG', 'sampleDesc1'),
      new Image('dragonfly2', '/images/GUD_3.JPG', 'sampleDesc2'),
      new Image('dragonfly3', '/images/GUD_2.JPG', 'sampleDesc3'),
      new Image('dragonfly4', '/images/GUD_1.JPG', 'sampleDesc4')
    ]
    const imageRenders = images.map((image) => {
      return <ImageCard image={image}/>
    })
    return (
      <div class="container-fluid">
        <div class="row" style={{justifyContent: 'space-between'}}>
          {imageRenders}
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  images: PropTypes.array
};

export default ImageContainer;
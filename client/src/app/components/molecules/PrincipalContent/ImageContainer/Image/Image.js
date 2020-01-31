import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {updateBackground} from './../../../../../pages/Home/actions'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageHeader from './ImageHeader/ImageHeader';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Image = props => {
  const image = props.image
  const classes = useStyles()
  const [img, setImg] = useState('')

  useEffect(() => {
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr = arrayBufferToBase64(image.img.data.data);
      const img = base64Flag + imageStr
      image.img.imageUrl = img
      setImg(img)
  })

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  
  // console.log(img)
  return (
    <Card className={`${classes.card} c-Image`} onClick={() => props.updateBackgroundDispatcher(img)}>
      <CardHeader avatar={<ImageHeader image={image.img} />} title={image.img.name} style={{textTransform: 'capitalize'}} />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title={image.img.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {image.img.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {image.img.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Like
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  );
};

Image.propTypes = {
  image: PropTypes.object,
  updateBackgroundDispatcher: PropTypes.func
};

const  mapDispatchToProps = {
  updateBackgroundDispatcher: updateBackground
}

export default connect(
  null,
  mapDispatchToProps
)(Image)
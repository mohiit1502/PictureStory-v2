import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {updateBackground} from './../../../../../pages/Home/actions'
import { makeStyles } from '@material-ui/core/styles';
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

  return (
    <Card className={`${classes.card} c-Image`} onClick={() => props.updateBackgroundDispatcher(image.imageUrl)}>
      <CardHeader avatar={<ImageHeader image={image} />} title={image.imageTitle} style={{textTransform: 'capitalize'}} />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image.imageUrl}
          title={image.imageTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {image.imageTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {image.imageDescription}
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
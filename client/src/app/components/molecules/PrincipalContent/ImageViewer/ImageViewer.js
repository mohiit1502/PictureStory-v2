import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Zoom, Paper} from '@material-ui/core';
import { updateModalState } from '../../../../pages/Home/actions';
import { getModalState, getBackgroundImage } from '../../../../pages/Home/selectors';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '85%',
    height: '85%'
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

const ImageViewer = props => {

  const classes = useStyles();
  return (
    <div className="c-ImageViewer">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalState || false}
        onClose={() => props.handleCloseDispatcher(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={props.modalState || false}>
          <Paper elevation={4} className={classes.paper}>
            
          </Paper>
        </Zoom>
      </Modal>
    </div>
  );
};

ImageViewer.propTypes = {
  handleCloseDispatcher: PropTypes.func,
  modalState: PropTypes.bool,
  selectedImage: PropTypes.string
};

const mapStateToProps = createPropsSelector({
  modalState: getModalState,
  selectedImage: getBackgroundImage
})

const mapDispatchToProps = {
  handleCloseDispatcher: updateModalState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageViewer)
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {withStyles} from '@material-ui/core/styles';
import {updateUploadModalState} from '../../../../pages/Home/actions';
import {getUploadModalState} from '../../../../pages/Home/selectors';
import Dropzone from './../Dropzone'
import Progress from '../Progress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Zoom, Paper} from '@material-ui/core';

const styles = theme => ({
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
    width: '40%'
  }
})

class Uploader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }
  
  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
  
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
  
      const formData = new FormData();
      formData.append("file", file, file.name);
  
      req.open("POST", "http://localhost:3001/upload");
      req.send(formData);
    });
  }

  render() {
    const {classes, modalState, handleCloseDispatcher} = this.props
    return (
      <div className="c-Uploader">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalState || false}
          onClose={() => handleCloseDispatcher(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Zoom in={modalState || false}>
            <Paper elevation={4} className={classes.paper}>
              <span className="Title">Upload Files</span>
              <div className="Content">
                <div>
                  <Dropzone
                    onFilesAdded={this.onFilesAdded}
                    disabled={this.state.uploading || this.state.successfullUploaded}
                  />
                </div>
                <div className="Files">
                  {this.state.files.map(file => {
                    return (
                      <div key={file.name} className="Row">
                        <span className="Filename">{file.name}</span>
                        {this.renderProgress(file)}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="Actions">
                {this.renderActions()}
              </div>
            </Paper>
          </Zoom>
        </Modal>
      </div>
    );
  }
}

Uploader.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCloseDispatcher: PropTypes.func,
  modalState: PropTypes.bool
};

const mapStateToProps = createPropsSelector({
  modalState: getUploadModalState
})

const mapDispatchToProps = {
  handleCloseDispatcher: updateUploadModalState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Uploader))
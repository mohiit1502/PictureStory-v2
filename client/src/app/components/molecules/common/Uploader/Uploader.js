import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { withStyles } from '@material-ui/core/styles';
import { updateUploadModalState } from '../../../../pages/Home/actions';
import { getUploadModalState } from '../../../../pages/Home/selectors';
import Dropzone from './../Dropzone'
import Progress from '../Progress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Zoom, Paper } from '@material-ui/core';

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
      imageURI: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.upload = this.upload.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
    this.compressAndUploadFiles = this.compressAndUploadFiles.bind(this);
    this.compress = this.compress.bind(this);
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
            src="/images/cloud.jpg"
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
        <button onClick={() => this.setState({ files: [], successfullUploaded: false })}>
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={() => this.compressAndUploadFiles(this.uploadFile)}
        >
          Upload
        </button>
      );
    }
  }

  compressAndUploadFiles() {
    this.state.files.forEach((file) => {
      this.compress(file).then((result) => {
        this.setState({ uploadProgress: {}, uploading: true });
        // result.forEach((file) => {
          this.upload(result)
        // })
      })
    })
  }

  compress(file) {
    return new Promise((resolve, reject) => {
      const width = 500;
      const height = 300;
      const fileName = file.name;
      const reader = new FileReader();
      const fileVariants = []
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          fileVariants.push(file)
          const elem = document.createElement('canvas');
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob((blob1) => {
            fileVariants.push(new File([blob1], `${fileName.split('.')[0]}_compressed_60.${fileName.split('.')[1]}`, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }))
            ctx.canvas.toBlob((blob2) => {
              fileVariants.push(new File([blob2], `${fileName.split('.')[0]}_compressed_20.${fileName.split('.')[1]}`, {
                type: 'image/jpeg',
                lastModified: Date.now()
              }))
              resolve(fileVariants)
            }, 'image/jpeg', 0.2)
          }, 'image/jpeg', 0.6)
        }
      }
      reader.onerror = error => console.log(error);
      reader.readAsDataURL(file);
    })
  }

  async upload(files) {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    // this.state.files.forEach(file => {
    promises.push(this.sendRequest(files));
    // });
    try {
      await Promise.all(promises).then(result => console.log('result === ' + result)).catch(err => console.log('error === ' + err));
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(files) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file, file.name);
      })
      fetch('http://localhost:3001/upload', {
        method: 'post',
        body: formData
      })
      .then(response => response.json())
      .then(jsonData => resolve(console.log(jsonData)))
      .catch(err => reject(err))
    });
  }

  render() {
    const { classes, modalState, handleCloseDispatcher } = this.props
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
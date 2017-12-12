import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { CircularProgress } from 'material-ui/Progress';

import styles from './styles';

const Transition = props => (
  <Slide direction="up" {...props} />
);

const CardDetails = ({
  isLoaded, isOpen, url,
  onLoaded, onClose,

  // material ui
  classes, fullScreen,

}) => (
  <Dialog
    maxWidth="md"
    fullScreen={fullScreen}
    open={isOpen}
    transition={Transition}
    onRequestClose={onClose}
  >
    <DialogContent
      className={classes.root}
      onClick={onClose}
    >
      <img
        className={classes.image}
        onLoad={onLoaded}
        src={url}
        style={{ display: isLoaded ? 'block' : 'none' }}
        alt="preview"
      />

      {!isLoaded && (
        <CircularProgress
          className={classes.progress}
          color="accent"
        />
      )}
    </DialogContent>
  </Dialog>
);

CardDetails.propTypes = {
  url: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onLoaded: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  classes: PropTypes.shape({}).isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(CardDetails));

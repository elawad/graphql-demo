import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, withMobileDialog } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { CircularProgress } from 'material-ui/Progress';

import styles from './styles';

const Transition = (props) => <Slide direction="up" {...props} />;

const CardDetails = ({
  isOpen,
  onClose,
  url,
  isLoaded,
  onLoaded,
  // material ui props
  classes,
  fullScreen,
}) => (
  <Dialog
    maxWidth="md"
    fullScreen={fullScreen}
    open={isOpen}
    transition={Transition}
    onRequestClose={onClose}
  >
    <DialogContent className={classes.root} onClick={onClose}>
      <img
        className={classes.image}
        style={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={onLoaded}
        src={url}
        alt="preview"
      />

      <CircularProgress
        className={classes.progress}
        style={{ opacity: isLoaded ? 0 : 1 }}
        color="accent"
      />
    </DialogContent>
  </Dialog>
);

CardDetails.propTypes = {
  url: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onLoaded: PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(CardDetails));

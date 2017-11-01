import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
// import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
// import PlayArrowIcon from 'material-ui-icons/PlayArrow';
// import SkipNextIcon from 'material-ui-icons/SkipNext';
import ThumbsUpIcon from 'material-ui-icons/ThumbUp';
import ThumbsDownIcon from 'material-ui-icons/ThumbDown';
// className={classes.playIcon}

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    minWidth: '8em',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

const MediaCard = (props) => {
  const { classes, image } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography type="headline">{image.id}</Typography>
          <Typography type="subheading" color="secondary">
            {image.likes} Likes
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Previous">
            {<ThumbsUpIcon />}
          </IconButton>
          <IconButton aria-label="Next">
            {<ThumbsDownIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={image.url}
        title={image.name}
      />
    </Card>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  // theme: PropTypes.shape({}).isRequired,
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const CardWithStyle = withStyles(styles, { withTheme: true })(MediaCard);

export default CardWithStyle;

// image="https://material-ui-next.com/static/images/cards/live-from-space.jpg"
// title="Live from space album cover"

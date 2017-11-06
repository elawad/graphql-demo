import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import DnVoteButton from '../Buttons/DnVoteButton';
import UpVoteButton from '../Buttons/UpVoteButton';

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,

    // [theme.breakpoints.down('sm')]: {
    //   width: '100%', // theme.typography.fontSize + 4,
    // },
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
    width: 150,
    height: 150,
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
          <Typography type="headline">{image.name}</Typography>
          <Typography type="subheading" color="secondary">
            {image.likes} Likes
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <UpVoteButton id={image.id} likes={image.likes} />
          <DnVoteButton id={image.id} likes={image.likes} />
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

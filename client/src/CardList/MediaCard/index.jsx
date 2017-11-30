import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import DnVoteButton from '../Buttons/DnVoteButton';
import UpVoteButton from '../Buttons/UpVoteButton';
import LikesCount from '../LikesCount';

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 1,
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      width: '100%', // theme.typography.fontSize + 4,
    },
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
    width: 225,
    minHeight: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  creator: {
    minHeight: '1.8em',
  },
  // playIcon: {
  //   height: 38,
  //   width: 38,
  // },
});

const MediaCard = (props) => {
  const { classes, image } = props;
  const {
    id, name, url, likes,
    // author
  } = image;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>

        <CardContent className={classes.content}>
          <Typography type="headline">{name}</Typography>

          {/* {author && (
          <Typography type="caption" color="secondary" className={classes.creator}>
            {author.firstName[0]}. {author.lastName}
          </Typography>)
          } */}


          <Typography type="subheading" color="secondary">
            <LikesCount likes={likes} />
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <UpVoteButton id={id} likes={likes} />
          <DnVoteButton id={id} likes={likes} />
        </div>

      </div>

      <CardMedia
        className={classes.cover}
        image={url}
        title={name}
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
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

const CardWithStyle = withStyles(styles, { withTheme: true })(MediaCard);

export default CardWithStyle;

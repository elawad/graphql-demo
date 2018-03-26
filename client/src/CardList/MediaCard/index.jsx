import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

import DnVoteButton from '../Buttons/DnVoteButton';
import UpVoteButton from '../Buttons/UpVoteButton';
import LikesCount from '../LikesCount';

import styles from './styles';

const MediaCard = (props) => {
  const { classes, image, onImageClick } = props;
  const {
    id, name, urlSm, likes,
    author
  } = image;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>

        <CardContent className={classes.content}>
          <Typography type="headline" className={classes.title}>{name}</Typography>

          <Typography type="subheading" color="secondary">
            <LikesCount likes={likes} />
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <UpVoteButton id={id} likes={likes} />
          <DnVoteButton id={id} likes={likes} />
        </div>

      </div>

      <ButtonBase
        focusRipple
        className={classes.coverButton}
      >
        <CardMedia
          className={classes.cover}
          image={urlSm}
          title={name}
          role="button"
          onClick={() => onImageClick()}
        />
      </ButtonBase>

      {author && (
      <Typography type="caption" color="secondary" className={classes.creator}>
        {author.firstName[0]}. {author.lastName}
      </Typography>)
      }
    </Card>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  // theme: PropTypes.shape({}).isRequired,

  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlSm: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,

    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  }).isRequired,

  onImageClick: PropTypes.func.isRequired,
};

// MediaCard.defaultProps = {};

const CardWithStyle = withStyles(styles, { withTheme: true })(MediaCard);

export default CardWithStyle;

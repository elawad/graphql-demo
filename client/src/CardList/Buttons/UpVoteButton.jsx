import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IconButton from 'material-ui/IconButton';
// import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
// import PlayArrowIcon from 'material-ui-icons/PlayArrow';
// import SkipNextIcon from 'material-ui-icons/SkipNext';
import ThumbsUpIcon from 'material-ui-icons/ThumbUp';

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { id, mutate } = this.props;

    mutate({ variables: { id } });
  }

  render() {
    return (
      <IconButton onClick={this.onClick} aria-label="Like">
        {<ThumbsUpIcon />}
      </IconButton>
    );
  }
}

NewEntry.propTypes = {
  mutate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  // isUpVote: PropTypes.bool.isRequired,
};

const submitRepository = gql`
  mutation ($id: Int!) {
    upVote(id: $id) {
      id
      likes
    }
  }
`;

const NewEntryWithData = graphql(submitRepository)(NewEntry);

export default NewEntryWithData;

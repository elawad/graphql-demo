import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IconButton from 'material-ui/IconButton';
import ThumbsDownIcon from 'material-ui-icons/ThumbDown';

class VoteButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { id, likes, mutate } = this.props;

    await mutate({
      variables: { id },
      optimisticResponse: {
        downVote: {
          __typename: 'Image',
          id,
          likes: (likes <= 0) ? 0 : likes - 1,
        }
      }
    });
  }

  render() {
    return (
      <IconButton onClick={this.onClick} aria-label="Dislike">
        {<ThumbsDownIcon />}
      </IconButton>
    );
  }
}

VoteButton.propTypes = {
  mutate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  // isUpVote: PropTypes.bool.isRequired,
};

const downVoteImage = gql`
  mutation ($id: Int!) {
    downVote(id: $id) {
      id
      likes
    }
  }
`;

const ButtonWithData = graphql(downVoteImage)(VoteButton);

export default ButtonWithData;

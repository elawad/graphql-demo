import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IconButton from 'material-ui/IconButton';
import ThumbsUpIcon from 'material-ui-icons/ThumbUp';

class VoteButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { id, likes, mutate } = this.props;

    this.setState({ isLoading: true });

    await mutate({
      variables: { id },
      optimisticResponse: {
        // __typename: 'Mutation',
        upVote: {
          __typename: 'Image',
          id,
          likes: likes + 1,
        }
      }
    });

    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <IconButton onClick={this.onClick} disabled={isLoading} aria-label="Like">
        {<ThumbsUpIcon />}
      </IconButton>
    );
  }
}

VoteButton.propTypes = {
  mutate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};

const upVoteImage = gql`
  mutation ($id: Int!) {
    upVote(id: $id) {
      id
      likes
    }
  }
`;

const ButtonWithData = graphql(upVoteImage)(VoteButton);

export default ButtonWithData;

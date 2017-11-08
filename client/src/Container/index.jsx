import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CardList from '../CardList';

// Query all images
const IMAGE_QUERY = gql`
query {
  images {
    id likes name url
  }
}`;

// Subscription to vote changes
const VOTE_SUBSCRIPTION = gql`
subscription {
  voteChanged {
    id likes
  }
}`;

class Container extends Component {
  componentWillMount() {
    const { data: { subscribeToMore } } = this.props;

    subscribeToMore({
      document: VOTE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.voteChanged) return prev;

        // Find/update image with new votes
        const newVote = subscriptionData.voteChanged;
        const { likes, id } = newVote;
        const images = [...prev.images];
        const i = images.findIndex(image => image.id === id);
        const image = Object.assign({}, images[i], { likes });
        images[i] = image;

        return Object.assign({}, prev, { images });
      }
    });
  }

  render() {
    const { data: { images, loading } } = this.props;

    return (
      !loading && <CardList images={images} />
    );
  }
}

Container.propTypes = {
  data: PropTypes.shape({
    // images: PropTypes.array,
    // loading: PropTypes.bool,
    // error: PropTypes.string,
    // refetch: PropTypes.func,
    // subscribeToMore: PropTypes.func,
  }).isRequired,
};

const ContainerWithData = graphql(IMAGE_QUERY)(Container);

export default ContainerWithData;

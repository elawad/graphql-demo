import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CardList from '../CardList';

// Query all images
const IMAGE_QUERY = gql`
  query {
    images {
      id likes name urlSm urlMd
      # author { firstName lastName }
    }
  }
`;

// Subscriptions
const VOTE_SUBSCRIPTION = gql`
  subscription {
    voteChanged {
      id likes
    }
  }
`;
const CREATE_SUBSCRIPTION = gql`
  subscription {
    imageCreated {
      id likes name urlSm urlMd
    }
  }
`;

class Container extends Component {
  componentDidMount() {
    const { subscribeToMore } = this.props.data;

    subscribeToMore({
      document: VOTE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.voteChanged) return prev;

        // Find/update image with new votes
        const newVote = subscriptionData.voteChanged;
        const { likes, id } = newVote;
        const images = [...prev.images];
        const i = images.findIndex((image) => image.id === id);
        const image = { ...images[i], likes };
        images[i] = image;
        return { ...prev, images };
      },
    });

    subscribeToMore({
      document: CREATE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.imageCreated) return prev;

        // Add new image
        const image = subscriptionData.imageCreated;
        const images = [image, ...prev.images];
        return { ...prev, images };
      },
    });
  }

  render() {
    const { images, loading } = this.props.data;

    return <CardList images={images} loading={loading} />;
  }
}

Container.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.array,
    loading: PropTypes.bool,
    subscribeToMore: PropTypes.func,

    // error: PropTypes.string,
    // refetch: PropTypes.func,
  }).isRequired,
};

const ContainerWithData = graphql(IMAGE_QUERY)(Container);

export default ContainerWithData;

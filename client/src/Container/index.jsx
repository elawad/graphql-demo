import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CardList from '../CardList';

const QUERY = gql`query {
  allImages(first: 12) {
    id, name, url, likes
  }
}`;

const Container = ({ data: { allImages, loading, error } }) => (
  <div>
    <p>Loading: {String(loading)}</p>
    <p>Errors: {error}</p>

    {!loading && <CardList images={allImages} />}

    {/*
    allImages.map(asset => (
      <li key={asset.id}>
        {asset.name}
      </li>
    ))}
    */}

  </div>
);

Container.propTypes = {
  data: PropTypes.shape({
    // allImages: PropTypes.array,
    // loading: PropTypes.bool,
    // error: PropTypes.string,
    // refetch: PropTypes.func,
  }).isRequired,
};

const ContainerWithData = graphql(QUERY)(Container);

export default ContainerWithData;

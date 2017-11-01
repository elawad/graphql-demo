import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`query DemoSchema {
  allAssets { id, name }
}`;

const Comp = ({ data: { allAssets, loading, error } }) => (
  <div>
    <p>Loading: {String(loading)}</p>
    <p>Errors: {error}</p>
    <ul>
      {!loading && allAssets.map(asset => (
        <li key={asset.id}>
          {asset.name}
        </li>
      ))}
    </ul>
  </div>
);

Comp.propTypes = {
  data: PropTypes.shape({
    // allAssets: PropTypes.array,
    // loading: PropTypes.bool,
    // error: PropTypes.string,
    // refetch: PropTypes.func,
  }).isRequired,
};

const CompWithData = graphql(QUERY)(Comp);

export default CompWithData;

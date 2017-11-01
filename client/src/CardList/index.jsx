import React from 'react';
import PropTypes from 'prop-types';

import MediaCard from './MediaCard';

const CardList = ({ images }) => (
  // const { classes, theme } = props;
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    textAlign: 'initial',
    padding: '0 16px 16px 0',
  }}
  >
    {images.map(image => (
      <MediaCard key={image.id} image={image} />
    ))}
  </div>
);

CardList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardList;

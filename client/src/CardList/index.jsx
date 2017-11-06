import React from 'react';
import PropTypes from 'prop-types';

import MediaCard from './MediaCard';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  WebkitJustifyContent: 'space-around',
  textAlign: 'initial',
  padding: '0 16px 16px 0',
};

const CardList = ({ images }) => (
  <div style={style}>
    {images.map(image => (
      <MediaCard key={image.id} image={image} />
    ))}
  </div>
);

CardList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardList;

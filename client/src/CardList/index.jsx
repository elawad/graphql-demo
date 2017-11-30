import React from 'react';
import PropTypes from 'prop-types';

import MediaCard from './MediaCard';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  WebkitJustifyContent: 'space-around',
  textAlign: 'initial',
  padding: '8px 16px 16px 8px',
  maxWidth: '80em',
  margin: '0 auto',
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

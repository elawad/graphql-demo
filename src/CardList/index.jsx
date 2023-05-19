import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

import MediaCard from './MediaCard';
import CardDetails from '../CardDetails';
import styles from './styles';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isLoaded: false,
      isOpen: false,
    };

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(url) {
    this.setState({ url, isLoaded: false, isOpen: true });
  }

  render() {
    const { images, loading } = this.props;
    const { url, isLoaded, isOpen } = this.state;

    return (
      <div>
        <div style={styles}>
          {loading && (
            <CircularProgress color="accent" style={{ marginTop: 16 }} />
          )}
          {!loading && !images.length && <p>No Image Data</p>}

          {images.map((image) => (
            <MediaCard
              key={image.id}
              image={image}
              onImageClick={() => this.handleImageClick(image.urlMd)}
            />
          ))}
        </div>

        <CardDetails
          {...{ url, isLoaded, isOpen }}
          onLoaded={() => this.setState({ isLoaded: true })}
          onClose={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }
}

CardList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      urlMd: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
};

CardList.defaultProps = {
  images: [],
};

export default CardList;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnimateOnChange from 'react-animate-on-change';

import './style.css';

class LikesCount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { diff: 0 };
  }

  componentWillReceiveProps(nextProps) {
    const diff = nextProps.likes - this.props.likes;
    if (diff !== 0) this.setState({ diff });
  }

  render() {
    const { likes } = this.props;
    const { diff } = this.state;
    const type = diff < 0 ? ' down' : '';

    return (
      <AnimateOnChange
        baseClassName="Likes"
        animationClassName={`Likes--bounce${type}`}
        animate
      >
        {likes} Likes
      </AnimateOnChange>
    );
  }
}

LikesCount.propTypes = {
  likes: PropTypes.number.isRequired,
};

export default LikesCount;

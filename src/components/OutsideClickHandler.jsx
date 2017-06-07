import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick: () => {},
};

class OutsideClickHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('mousedown', this.onOutsideClick, true);
    } else {
      document.attachEvent('onmousedown', this.onOutsideClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('mousedown', this.onOutsideClick, true);
    } else {
      document.detachEvent('onmousedown', this.onOutsideClick);
    }
  }

  onOutsideClick(e) {
    e = e || window.event;
    const mouseTarget = (typeof e.which !== 'undefined') ? e.which : e.button;
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.childNode).contains(e.target);
    if (!isDescendantOfRoot && mouseTarget === 1) {
      const { onOutsideClick } = this.props;
      onOutsideClick && onOutsideClick(e);
    }
  }

  render() {
    const { focused } = this.props;
    const outsideClass = focused
      ? 'outside_container active'
      : 'outside_container';
    return (
      <div ref={(c) => this.childNode = c} className={outsideClass}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;

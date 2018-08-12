import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  onOutsideClick: PropTypes.func,
};

const defaultProps = {
  children: <span />,
  onOutsideClick: Function.prototype,
};

class OutsideClickHandler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.hasAction = false;
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    this.bindActions();
  }

  componentDidUpdate() {
    this.bindActions();
  }

  componentWillUnmount() {
    this.unbindActions();
  }

  bindActions() {
    const { closeOnOutsideClick } = this.props;
    if (closeOnOutsideClick) {
      if (this.hasAction) return;
      if (document.addEventListener) {
        document.addEventListener('mousedown', this.onOutsideClick, true);
      } else {
        document.attachEvent('onmousedown', this.onOutsideClick);
      }
      this.hasAction = true;
    }
  }

  unbindActions() {
    if (!this.hasAction) return;
    const { closeOnOutsideClick } = this.props;
    if (closeOnOutsideClick) {
      if (document.removeEventListener) {
        document.removeEventListener('mousedown', this.onOutsideClick, true);
      } else {
        document.detachEvent('onmousedown', this.onOutsideClick);
      }
      this.hasAction = false;
    }
  }

  onOutsideClick(e) {
    const event = e || window.event;
    const mouseTarget = (typeof event.which !== 'undefined') ? event.which : event.button;
    const isDescendantOfRoot = ReactDOM.findDOMNode(this.childNode).contains(event.target);

    if (!isDescendantOfRoot && mouseTarget === 1) {
      const { onOutsideClick } = this.props;
      onOutsideClick && onOutsideClick(event);
    }
  }

  render() {
    const { focused } = this.props;
    const outsideClass = focused
      ? 'outside_container active'
      : 'outside_container';
    return (
      <div ref={c => (this.childNode = c)} className={outsideClass}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;

export default OutsideClickHandler;

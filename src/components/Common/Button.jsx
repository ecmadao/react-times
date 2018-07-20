
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseDown() {
    this.setState({ pressed: true });
  }

  onMouseUp() {
    this.setState({ pressed: false });
  }

  onMouseEnter() {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter();
  }

  onMouseLeave() {
    this.onMouseUp();
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave();
  }

  render() {
    const {
      onClick,
      children,
      className,
    } = this.props;
    const { pressed } = this.state;

    const buttonClass = cx(
      'react_times_button',
      pressed && 'pressDown',
      className
    );

    return (
      <div
        onClick={onClick}
        className={buttonClass}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
      >
        <div className="wrapper">
          {children}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.array,
    PropTypes.string
  ]),
  className: PropTypes.string,
};

Button.defaultProps = {
  text: 'button',
  onClick: Function.prototype,
  children: null,
  className: '',
};

export default Button;

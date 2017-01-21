import React, { PropTypes } from 'react';

class Button extends React.Component {
  render() {
    const {
      text,
      onClick
    } = this.props;

    return (
      <div
        className="time_picker_button"
        onClick={onClick}>
        {text}
      </div>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: 'button',
  onClick: () => {}
};

export default Button;

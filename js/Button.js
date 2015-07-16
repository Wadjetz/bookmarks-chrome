import React from 'react/addons';
import Radium from 'radium';

export default React.createClass(Radium.wrap({
  displayName: "Button",
  render: function () {
    let iconeView = (this.props.iconClass) ? <i className={this.props.iconClass}></i> : null;
    return (
      <button {...this.props}
        style={(this.props.matchParent) ? [buttonStyle, widthStyle] : [buttonStyle]}
      >
        {iconeView} {this.props.name}
      </button>
    );
  },
  propTypes: {
    name: React.PropTypes.string.isRequired,
    iconClass: React.PropTypes.string,
    matchParent: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      matchParent: false
    }
  }

}));

let buttonStyle = {
  display: 'inline-block',
  cursor: 'pointer',
  padding: '5px 15px',
  marginRight: '5px',
  border: 0,
  borderRadius: '3px',
  fontSize: '1rem',
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.9)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',


  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
};

let widthStyle = {
  width: '100%',
  display: 'block',
  padding: '10px 15px',
  margin: '10px 0'
};



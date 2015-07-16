import React from 'react/addons';

export default React.createClass({
  render: function () {
    let className = "tag hover " + ((this.props.active) ? "active" : "");
    let tagName = this.props.name
    return (
      <span
        className={className}
        onClick={(this.props.active) ? this.props.removeTag : this.props.addTags} >
        {tagName} {(this.props.active) ? <i className="fa fa-times"></i> : ""}
      </span>
    );
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    removeTag: React.PropTypes.func,
    addTags: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      removeTag: function () {
        console.warn("Default removeTag");
      },
      addTags: function () {
        console.error("Default addTags");
      }
    };
  }
});

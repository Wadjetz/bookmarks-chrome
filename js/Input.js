import React from 'react/addons';
import Radium from 'radium';
import _ from 'lodash';

export default React.createClass(Radium.wrap({
  displayName: "Input",

  render: function () {
    let errorView = (this.props.showError)
                ? <span style={errorStyle}>{this.props.errMsg}</span>
                : null;
    let labelView = this.props.label || _.capitalize(this.props.name);
    return (
      <div style={wrapStyle}>
        <label htmlFor={this.props.name}>
          {labelView} {errorView}
        </label>
        {this.renderInputItem(this.props.type)}
      </div>
    );
  },

  renderInputItem: function (type) {
    if (type === "textarea") {
      return this.renderTextArea();
    } else if (type === 'autocomplete') {
      return this.renderAutocomplete();
    } else {
      return this.renderInput();
    }
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['text', 'password', 'email', 'textarea', 'autocomplete']),
    label: React.PropTypes.string,
    errMsg: React.PropTypes.string,
    showError: React.PropTypes.bool,
    listData: React.PropTypes.array,
  },

  getDefaultProps: function () {
    return {
      type: "text",
      showError: false,
      listData: []
    }
  },

  renderInput: function () {
    return (
      <input {...this.props}
        id={this.props.name}
        style={inputStyle}
        type={this.props.type}
      />
    );
  },

  renderTextArea: function () {
    return (
      <textarea {...this.props}
        id={this.props.name}
        style={inputStyle}
        type={this.props.type}
      />
    );
  },

  _renderAutocomplete: function () {
    return (
      <div>
        <input {...this.props}
          id={this.props.name}
          style={inputStyle}
          type={this.props.type}
          list={this.props.name + "-tagslist"}
        />
        <datalist id={this.props.name + "-tagslist"}>
          {this.props.listData.map((tag, i) =>
            <option key={tag + "-" + i} value={tag} />
          )}
        </datalist>
      </div>
    );
  },

  renderAutocomplete: function () {
    // let tagsMatch = this.props.listData.filter(t => {
    //   _.startsWith()
    // });
    console.log(this);
    return (
      <div>
        <input {...this.props}
          id={this.props.name}
          style={inputStyle}
          type={this.props.type}
          list={this.props.name + "-tagslist"}
        />
        <ul>
          {this.props.listData.map((tag, i) => {
             <li key={tag + "-" + i}>{tag}</li>
          })}
        </ul>
      </div>
    );
  }

}));

let inputStyle = {
  width: '100%',
  display: 'block',
  border: 0,
  fontSize: '1rem',
  padding: '3px',
  marginBottom: '5px',
  color: 'rgba(255, 255, 255, 0.9)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
}

let wrapStyle = {
}

let errorStyle = {
  color: 'rgba(155, 0, 0, 0.4)',
}

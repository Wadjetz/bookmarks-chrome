var React = require('react');

var Input = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf(["text", "password", "login"]),
        label: React.PropTypes.string,
        value: React.PropTypes.string,
        className: React.PropTypes.string,
        style: React.PropTypes.object
    },
    getDefaultProps: function () {
        return {
            type: 'text',
            label: 'Label',
            value: '',
            className: '',
            labelStyle: {
                textAlign: 'left'
            },
            inputStyle: {
                width: "100%",
                height: 20,
                padding: 2,
                margin: 3,
                display: 'inline-block',
                WebkitAppearance: 'none',
	            WebkitBorderRadius: 0,
                border: '1px solid #DDD'
            }
        };
    },

    render: function () {
        return (
            <div>
                <label style={this.props.labelStyle}>
                    {this.props.label}
                </label>
                <input
                    ref="val"
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.update}
                    style={this.props.inputStyle} />
            </div>
        );
    }
});

module.exports = Input;

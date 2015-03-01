var React = require('react');

var style = {
    width: "49%",
    height: 20,
    padding: 2,
    margin: 3,
    float: 'inline-block'
};

var FormInput = React.createClass({
    render: function () {
        return (
            <input {...this.props} type="text" onChange={this.props.update} style={style} />
        );
    }
});

module.exports = FormInput;

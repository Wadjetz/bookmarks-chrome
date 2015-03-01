var React = require('react');

var style = {
    width: "99%",
    height: 44,
    padding: 2,
    margin: 3,
    display: 'inline-block'
};

var FormTextArea = React.createClass({
    render: function () {
        return (
            <textarea onChange={this.props.update} style={style} />
        );
    }
});

module.exports = FormTextArea;

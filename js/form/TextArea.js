var React = require('react');

var style = {
    width: "99%",
    height: 44,
    padding: 2,
    margin: 3,
    display: 'inline-block'
};

var TextArea = React.createClass({
    render: function () {
        return (
            <div {...this.props}>
                <label>{this.props.label}</label>
                <textarea
                    ref="val"
                    value={this.props.value}
                    onChange={this.props.update}
                    style={style} />
            </div>
        );
    }
});

module.exports = TextArea;

var React = require('react');

var style = {
    width: "49%",
    height: 20,
    padding: 2,
    margin: 3,
    float: 'inline-block'
};

var Select = React.createClass({
    render: function () {
        return (
            <div {...this.props}>
                <select
                    ref="val"
                    style={style}
                    onChange={this.update}>
                    {this.props.elements.map(function (item) {
                        return (
                            <option value={item} key={item}>{item}</option>
                        );
                    })}
                </select>
            </div>
        );
    },

    update: function () {
        this.props.update(
            this.refs.val.getDOMNode().value
        );
    }
});

module.exports = Select;

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
            <div>
                <select style={style} onChange={this.props.update}>
                    {this.props.elements.map(function (item) {
                        return (
                            <option value={item}>{item}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
});

module.exports = Select;

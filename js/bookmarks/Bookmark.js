var React = require('react');

var titleStyle = {
    'fontSize': '1em',
};

var bookmarkStyle = {
    border: '1px solid black',
    margin: '5px 0',
    padding: 3
};

var Bookmark = React.createClass({
    render: function () {

        var bookmark = this.props.bookmark;
        console.log(bookmark);

        return (
            <div style={bookmarkStyle}>
                <h1 style={titleStyle}>{bookmark.title}</h1>
                <p>{bookmark.description}</p>
            </div>
        );
    }
});

module.exports = Bookmark;

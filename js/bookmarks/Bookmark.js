var React = require('react');

var titleStyle = {
    fontSize: '1em',
    cursor: 'pointer'
};

var bookmarkStyle = {
    border: '1px solid black',
    margin: '2px 0',
    padding: 1
};

var Bookmark = React.createClass({
    render: function () {
        var bookmark = this.props.bookmark;

        return (
            <div style={bookmarkStyle}>
                <h1 style={titleStyle} onClick={this.open} >
                    {bookmark.title}
                </h1>
            </div>
        );
    },
    open: function () {
        chrome.tabs.create({
            url: this.props.bookmark.url
        });
    }
});

module.exports = Bookmark;

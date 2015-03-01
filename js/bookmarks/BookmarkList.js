var React = require('react');
var Bookmark = require('./Bookmark');
var BookmarksService = require('../services/bookmarks-service');

var style = {
    width: '49%',
    margin: 3,
    verticalAlign: 'top',
    display: 'inline-block'
};

var BookmarkList = React.createClass({

    getInitialState: function () {
        return {
            bookmarks: [],
            bookmarksRecents: []
        };
    },

    componentWillMount: function () {
        BookmarksService.getBookmarks(function (res) {
            this.setState({
                bookmarks: res
            });
        }.bind(this));
        BookmarksService.getRecentsBookmarks(function (res) {
            this.setState({
                bookmarksRecents: res
            });
        }.bind(this));
    },

    render: function () {
        var bookmarkList = this.state.bookmarks.map(function (bookmark) {
            return (
                <Bookmark bookmark={bookmark} key={bookmark._id} />
            );
        });

        var bookmarkListRecents = this.state.bookmarksRecents.map(function (bookmark) {
            return (
                <Bookmark bookmark={bookmark} key={bookmark._id} />
            );
        });

        return (
            <div>
                <div style={style}>
                    {bookmarkList}
                </div>
                <div style={style}>
                    {bookmarkListRecents}
                </div>
            </div>
        );
    }
});

module.exports = BookmarkList;

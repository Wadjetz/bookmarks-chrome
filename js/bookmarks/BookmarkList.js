var React = require('react');
var Bookmark = require('./Bookmark');
var BookmarksService = require('../services/bookmarks-service');

var BookmarkList = React.createClass({

    getInitialState: function () {
        return {
            bookmarks: []
        };
    },

    componentWillMount: function () {
        BookmarksService.getBookmarks(function (res) {
            this.setState({
                bookmarks: res
            });
        }.bind(this));
    },

    render: function () {
        var bookmarks = this.state.bookmarks;
        var bookmarkList = bookmarks.map(function (bookmark) {
            return (
                <Bookmark bookmark={bookmark} key={bookmark._id} />
            );
        });

        return (
            <div>
                {bookmarkList}
            </div>
        );
    }
});

module.exports = BookmarkList;

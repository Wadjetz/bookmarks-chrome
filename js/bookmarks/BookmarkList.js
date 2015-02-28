var React = require('react');
var Bookmark = require('./Bookmark');
var $ = require('jquery');

var BookmarkList = React.createClass({

    getInitialState: function () {
        return {
            bookmarks: []
        };
    },

    componentDidMount: function () {
        $.get('http://localhost:8888/api/secure/bookmarks?order=recents', function(res) {
            this.setState({
                bookmarks: res
            });
        }.bind(this));
    },

    render: function () {
        var bookmarks = this.state.bookmarks;
        var bookmarkList = bookmarks.map(function (bookmark) {
            return (
                <Bookmark bookmark={bookmark} />
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

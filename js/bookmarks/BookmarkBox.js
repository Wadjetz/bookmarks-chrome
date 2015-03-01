var React = require('react');
var BookmarkList = require('./BookmarkList');
var BookmarkForm = require('./BookmarkForm');

var BookmarkBox = React.createClass({
    render: function () {
        return (
            <div>
                <BookmarkForm />
                <BookmarkList />
            </div>
        );
    }
});

module.exports = BookmarkBox;

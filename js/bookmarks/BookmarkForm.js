var React = require('react');

var BookmarkForm = React.createClass({
    render: function () {

        var url = this.props.url;
        var title = this.props.title;

        return (
            <div>
                <input type="text" value={url} placeholder="url" />
                <input type="text" value={title} placeholder="title" />
            </div>
        );
    }
});

module.exports = BookmarkForm;

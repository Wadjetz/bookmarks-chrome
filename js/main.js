var React = require('react');
var BookmarkBox = require('./bookmarks/BookmarkBox');

var style = {
    width: 700,
	overflowY: 'scroll'
};

var App = React.createClass({
    render: function () {
        return (
			<div style={style}>
				<BookmarkBox />
			</div>
        );
    }
});


React.render(<App />, document.body);

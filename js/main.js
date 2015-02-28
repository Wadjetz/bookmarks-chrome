var React = require('react');
var BookmarkBox = require('./bookmarks/BookmarkBox');

var style = {
    width: 700,
	heigth : 500,
	overflowY: 'scroll'
};

var App = React.createClass({
    render: function () {
        return (
			<div style={style}>
            	<h1>Hello</h1>
				<BookmarkBox />
			</div>
        );
    }
});


React.render(<App />, document.body);

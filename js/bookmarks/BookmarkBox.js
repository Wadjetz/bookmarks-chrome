var React = require('react');
var BookmarkList = require('./BookmarkList');
var BookmarkForm = require('./BookmarkForm');

var BookmarkBox = React.createClass({
    getInitialState: function () {
        return {
            currentUrl: "",
            currentTitle: ""
        };
    },

    componentDidMount: function () {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            console.log(tabs);
            this.setState({
                currentUrl: tabs[0].url,
                currentTitle: tabs[0].title
            });
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <BookmarkForm url={this.state.currentUrl} title={this.state.currentTitle} />
                <BookmarkList />
            </div>
        );
    }
});

module.exports = BookmarkBox;

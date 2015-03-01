var React = require('react');
var Bookmark = require('./Bookmark');
var BookmarksService = require('../services/bookmarks-service');
var Select = require('../form/Select');

var BookmarkKeywords = React.createClass({

    getInitialState: function () {
        return {
            keywords: []
        };
    },

    componentWillMount: function () {
        BookmarksService.getKeywords(function (res) {
			console.log(res);
            this.setState({
                keywords: res
            });
        }.bind(this));
    },

    render: function () {
        return (
            <Select elements={this.state.keywords}/>
        );
    }
});

module.exports = BookmarkKeywords;

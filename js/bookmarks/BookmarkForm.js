var React = require('react');
var Input = require('../form/Input');
var TextArea = require('../form/TextArea');
var BookmarksService = require('../services/bookmarks-service');
var BookmarkKeywords = require('./BookmarkKeywords');

var styleForm = {
    width: "100%",
    padding: 5,
    position: 'relative',
    textAlign: 'center'
};

var styleButtonSave = {
    width: "60%",
    padding: 2,
    margin: 3,
    display: 'inline-block'
};

var savedStyle = {
    width: '100%',
    padding: 4,
    backgroundColor: 'red'
};


var BookmarkForm = React.createClass({
    getInitialState: function() {
        return {
            url: "",
            title: "",
            description: "",
            isExist: "No Saved"
        };
    },

    componentWillMount: function () {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            this.setState({
                url: tabs[0].url,
                title: tabs[0].title
            });
            BookmarksService.isExist(tabs[0].url, function (res) {
                console.log("isExist", res.bookmark);
                if (res.bookmark !== null) {
                    this.setState({
                        isExist: "Saved"
                    });
                }
            }.bind(this));
        }.bind(this));
    },

    update: function () {
        this.setState({
            url: this.refs.url.getDOMNode().value.trim(),
            title: this.refs.title.getDOMNode().value.trim(),
            description: this.refs.description.getDOMNode().value.trim()
        });
    },

    render: function () {
        return (
            <div style={styleForm}>
                <div>{this.state.isExist}</div>
                <Input ref="url" value={this.state.url} update={this.update} />
                <Input ref="title" value={this.state.title} update={this.update} />
                <TextArea ref="description" value={this.state.description} update={this.update} />
                <BookmarkKeywords />
                <input type="button" value="Save" style={styleButtonSave} onClick={this.save}/>
            </div>
        );
    },

    save: function () {
        BookmarksService.save({
            url: this.refs.url.getDOMNode().value.trim(),
            title: this.refs.title.getDOMNode().value.trim(),
            description: this.refs.description.getDOMNode().value.trim(),
            keywords: "A"
        }, function (res) {
            console.log("Save res = ", res);
            if (res.error === false) {
                this.setState({
                    url: "",
                    title: "",
                    description: "",
                    isExist: "Saved"
                });
            }
        }.bind(this));
    }
});

module.exports = BookmarkForm;

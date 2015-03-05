var React = require('react');
var Input = require('../form/Input');
var TextArea = require('../form/TextArea');
var Select = require('../form/Select');
var BookmarksService = require('../services/bookmarks-service');
var BrowserService = require('../services/browser-service');

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
            keyword: "A",
            keywordsList: [],
            isExist: "No Saved"
        };
    },

    componentWillMount: function () {
        BrowserService.getTabInfo(function (url, title) {
            console.log("BookmarkForm", "CWM", "ChromeServ", "getTabInfo", "url=", url, "title=", title);
            this.setState({
                url: url,
                title: title
            });
            BookmarksService.isExist(url, function (res) {
                console.log("isExist", res.bookmark);
                if (res.bookmark !== null) {
                    this.setState({
                        isExist: "Saved"
                    });
                }
            }.bind(this));
        }.bind(this));
        BookmarksService.getKeywords(function (res) {
			console.log("BookmarkForm", "CWM", "BookmarksService.getKeywords", res);
            this.setState({
                keywordsList: res
            });
        }.bind(this));
    },

    update: function () {
        console.log("BookmarkForm", "update", this.refs.url.getDOMNode().value.trim());
        this.setState({
            url: this.refs.url.refs.val.getDOMNode().value.trim(),
            title: this.refs.title.refs.val.getDOMNode().value.trim(),
            description: this.refs.description.refs.val.getDOMNode().value.trim()
        });
    },

    select: function (value) {
        console.log("BookmarkForm", "select", "value=", value);
        this.setState({
            keyword: value
        });
    },

    render: function () {
        return (
            <div style={styleForm}>
                <div>{this.state.isExist}</div>
                <Input type="login" ref="url" label="Url" value={this.state.url} update={this.update} />
                <Input type="text" ref="title" label="Title" value={this.state.title} update={this.update} />
                <TextArea ref="description" label="Description" value={this.state.description} update={this.update} />
                <Select ref="keywords" elements={this.state.keywordsList} update={this.select} />
                <input type="button" value="Save" style={styleButtonSave} onClick={this.save} />
            </div>
        );
    },

    save: function () {
        BookmarksService.save({
            url: this.refs.url.refs.val.getDOMNode().value.trim(),
            title: this.refs.title.refs.val.getDOMNode().value.trim(),
            description: this.refs.description.refs.val.getDOMNode().value.trim(),
            keywords: this.state.keyword
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

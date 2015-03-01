var React = require('react');
var FormInput = require('../form/FormInput');
var FormTextArea = require('../form/FormTextArea');
var BookmarksService = require('../services/bookmarks-service');

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
}


var BookmarkForm = React.createClass({

    // Set states
    getInitialState: function() {
        console.log("getInitialState url=", this.props.url, "title", this.props.title);
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
                <FormInput ref="url" value={this.state.url} update={this.update} />
                <FormInput ref="title" value={this.state.title} update={this.update} />
                <FormTextArea ref="description" value={this.state.description} update={this.update} />
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

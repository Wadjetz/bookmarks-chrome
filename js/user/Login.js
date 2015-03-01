var React = require('react');
var Input = require('../form/Input');
var TextArea = require('../form/TextArea');
var BookmarksService = require('../services/bookmarks-service');

var Login = React.createClass({
    getInitialState: function() {
        return {
            login: "",
            password: ""
        };
    },

    update: function () {
        this.setState({
            login: this.refs.login.getDOMNode().value.trim(),
            password: this.refs.password.getDOMNode().value.trim()
        });
    },

    render: function () {
        return (
            <div>
                <Input ref="login" value={this.state.login} update={this.update} placeholder="login" />
                <Input ref="password" type="password" value={this.state.password} update={this.update} placeholder="password" />
                <input type="button" value="Save" onClick={this.submit} />
            </div>
        );
    },
    
    submit: function () {
        this.props.login(
            this.refs.login.getDOMNode().value.trim(),
            this.refs.password.getDOMNode().value.trim()
        );
    }
});

module.exports = Login;

var React = require('react');
var Form = require('../form/Form');
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
        console.log(this.refs);
        this.setState({
            login: this.refs.login.refs.val.getDOMNode().value.trim(),
            password: this.refs.password.refs.val.getDOMNode().value.trim()
        });
    },

    render: function () {
        return (
            <Form>
                <Input type="text" ref="login" value={this.state.login} update={this.update} placeholder="login" />
                <Input type="password" ref="password" value={this.state.password} update={this.update} placeholder="password" />
                <input type="button" value="Save" onClick={this.submit} />
            </Form>
        );
    },

    submit: function () {
        this.props.login(
            this.refs.login.refs.val.getDOMNode().value.trim(),
            this.refs.password.refs.val.getDOMNode().value.trim()
        );
    }
});

module.exports = Login;

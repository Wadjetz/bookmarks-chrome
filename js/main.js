var React = require('react');
var Login = require('./user/Login');
var BookmarkBox = require('./bookmarks/BookmarkBox');
var BookmarksService = require('./services/bookmarks-service');

var style = {
    width: 700,
	overflowY: 'scroll'
};

var App = React.createClass({
    getInitialState: function () {
        return {
            user: '',
            isConnected: false
        };
    },

    componentWillMount: function () {
        BookmarksService.isConnected(function (res) {
            console.log("isConnected", res);
            this.setState({
                isConnected: res.connected
            });
        }.bind(this));
    },

    render: function () {
        return (
			<div style={style}>
                {(function () {
                    if (this.state.isConnected === false) {
                        return (<Login login={this.login} />);
                    } else {
				        return (<BookmarkBox />);
                    }
                }.bind(this)())}
			</div>
        );
    },
    login: function (login, password) {
        console.log("main login", login, "password", password);
        BookmarksService.login({
            login: login,
            password: password,
        }, function (res) {
            console.log("login", res);
            if (res.error === false) {
                this.setState({
                    isConnected: true
                });
            }
        }.bind(this));
    }
});


React.render(<App />, document.body);

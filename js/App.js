import React from 'react';
import BrowserService from './services/BrowserService';
import BookmarksService from './services/BookmarksService';
import BookmarksForm from './BookmarksForm';
import Button from './Button';

export default React.createClass({
  render: function () {
    return (
      <div style={style}>
        {
          (this.state.connected)
          ? <BookmarksForm />
          : <Button name="Connexion" onClick={this.connection} />
        }
      </div>
    );
  },

  connection: function () {
    BrowserService.openNewTab("http://berezovskiy.fr/auth");
  },

  getInitialState: function () {
    return {
      connected: true
    };
  },

  componentDidMount: function () {
    BookmarksService.isConnected().then(res => {
      console.log("isConnected res", res);
      this.setState({
        connected: true
      });
    }, (err => {
      console.log("isConnected err", err);
      if (err.status === 401) {
        this.setState({
          connected: false
        });
      }
    }));
  }
});

let style = {
  width: '500px',
  height: '300px',
  padding: '10px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'Arial, Helvetica, sans-serif',
  backgroundColor: 'rgba(30, 87, 153, 1)'
};


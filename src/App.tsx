import * as React from "react"
import * as  BookmarksService from "./services/BookmarksService"

interface AppProps {

}

export default class App extends React.Component<AppProps, void> {
  render() {
    return (
      <div className="main">
        <h1>Bookmarks</h1>
      </div>
    )
  }
}


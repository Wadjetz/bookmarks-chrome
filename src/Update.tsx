import * as React from "react"
import update from "immupdate"
import { Bookmark, Category } from "./models"

interface Props {
  bookmark?: Bookmark
  onUpdate: () => void
}

export default class Update extends React.Component<Props, void> {
  render() {
    const { onUpdate } = this.props
    const bookmark = this.props.bookmark || {
      url: "",
      title: "",
      description: "",
      category: "",
      tags: []
    }
    return (
      <div className="update">
        <h1>Aleardy exist</h1>
        <h2>{bookmark.title}</h2>
        <div>{bookmark.url}</div>
        <div>{bookmark.description}</div>
        <div>{bookmark.category}</div>
        <div>{bookmark.tags.join(", ")}</div>
        {!!this.props.bookmark
          ? <button className="btn" onClick={onUpdate}>Update</button>
          : null}
      </div>
    )
  }
}

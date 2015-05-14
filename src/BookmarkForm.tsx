import * as React from "react"
import update from "immupdate"
import { Bookmark, Category } from "./models"
import * as Select from "react-select"
import { Creatable } from "react-select"

interface Props {
  bookmark: Bookmark
  allTags: string[]
  categories: Category[]
  onChange: (Bookmark) => void
  onSubmit: (Bookmark) => void
}

export default class BookmarkForm extends React.Component<Props, void> {
  render() {
    const { bookmark, allTags, categories, onChange, onSubmit } = this.props
    return (
      <div className="bookmark-form">
        <div className="form-group">
          <label className="edit-text-label">Url</label>
          <input
            className="edit-text"
            value={bookmark.url}
            onChange={this.handleOnInputChange("url")}
          />
        </div>
        <div className="form-group">
          <label className="edit-text-label">Title</label>
          <input
            className="edit-text"
            value={bookmark.title}
            onChange={this.handleOnInputChange("title")}
          />
        </div>
        <div className="form-group">
          <label className="edit-text-label">Description</label>
          <textarea
            className="edit-text"
            value={bookmark.description}
            onChange={this.handleOnInputChange("description")}
          />
        </div>
        <div className="form-group">
          <label className="edit-text-label">Tags</label>
          <Creatable
            name="tags"
            value={bookmark.tags}
            options={allTags.map(tag => ({ value: tag, label: tag }))}
            onChange={this.handleOnTagsChange("tags")}
            multi={true} allowCreate={true}
          />
        </div>
        <div className="form-group">
          <label className="edit-text-label">Category</label>
          <Select
            name="category"
            value={bookmark.category}
            options={categories.map(c => ({ value: c.name, label: c.name }))}
            onChange={this.handleOnSelectChange("category")}
          />
        </div>
        <div className="form-group">
          <button className="btn" onClick={this.handleOnSubmit}>Save</button>
        </div>
      </div>
    )
  }

  handleOnInputChange = (field: string) => (e: any) => {
    const { onChange, bookmark } = this.props
    onChange(update(bookmark, {
      [field]: e.target.value
    }))
  }

  handleOnSelectChange = (field: string) => (e: { value: string }) => {
    const { onChange, bookmark } = this.props
    onChange(update(bookmark, {
      [field]: e.value
    }))
  }

  handleOnTagsChange = (field: string) => (e: any) => {
    console.log("BookmarkForm.handleOnTagsChange", field, (e as any[]).map(v => v.value))
    const { onChange, bookmark } = this.props
    onChange(update(bookmark, {
      [field]: (e as any[]).map(v => v.value)
    }))
  }

  handleOnSubmit = () => {
    const { onSubmit, bookmark } = this.props
    onSubmit(bookmark)
  }
}

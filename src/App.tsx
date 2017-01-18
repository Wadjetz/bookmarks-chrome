import * as React from "react"
import update from "immupdate"
import { getCategories, getTags, isExist, saveBookmark } from "./services/BookmarksService"
import { Bookmark, Category } from "./models"
import { Tab, getTabInfo } from "./services/BrowserService"
import { extractTags } from "./services/TagsExtractor"
import BookmarkForm from "./BookmarkForm"
import Update from "./Update"

interface AppState {
  tab: Tab,
  bookmark: Bookmark
  updateBookamrk?: Bookmark
  categories: Category[]
  allTags: string[]
  isExist: boolean
  update: boolean
}

export default class App extends React.Component<void, AppState> {

  constructor(props: void) {
    super(props)
    this.state = {
      tab: {
        title: "",
        url: ""
      },
      bookmark: {
        url: "",
        title: "",
        description: "",
        category: "",
        tags: []
      },
      categories: [],
      allTags: [],
      isExist: false,
      update: false
    }
  }

  componentWillMount() {
    getCategories().then(categories => {
      this.setState(update(this.state, {
        categories: categories
      }))
    })

    getTabInfo().then(tab => {
      getTags().then(allTags => {
        this.setState(update(this.state, {
          allTags: allTags
        }))

        this.setState(update(this.state, {
          tab: tab,
          bookmark: {
            title: tab.title,
            url: tab.url,
            tags: extractTags(allTags, tab.title, tab.url)
          }
        }))
      })

      isExist(tab.url).then(exist => {
        this.setState(update(this.state, {
          isExist: exist.exist
        }))
      })
    })
  }

  render() {
    const { bookmark, updateBookamrk, allTags, categories, isExist } = this.state
    return (
      <div className="main">
        {isExist
          ? <Update onUpdate={this.handleOnUpdate} bookmark={updateBookamrk} />
          : <BookmarkForm bookmark={bookmark} allTags={allTags} categories={categories} onChange={this.handleOnChange} onSubmit={this.handleOnSubmit} />
        }
      </div>
    )
  }

  handleOnUpdate = () => {
    
  }

  handleOnChange = (bookmark: Bookmark) => {
    console.log("App.handleOnChange", bookmark)
    const tags = this.state.allTags.concat(bookmark.tags)
    this.setState(update(this.state, {
      bookmark: bookmark,
      allTags: tags
    }))
  }

  handleOnSubmit = (bookmark: Bookmark) => {
    console.log("handleOnSubmit", bookmark)
    saveBookmark(bookmark).then(result => {
      console.log("saveBookmark", result)
      this.setState(update(this.state, {
        isExist: true
      }))
    }).catch(error => {
      console.log("saveBookmark error", error)
    })
  }
}


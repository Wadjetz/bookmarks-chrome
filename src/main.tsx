import * as React from "react"
import * as ReactDom from "react-dom"
import App from "./App"
import * as BookmarksService from "./services/BookmarksService"
import * as BrowserService from "./services/BrowserService"

BrowserService.getTabInfo().then(tab => {
  console.log("BrowserService.getTabInfo", tab)
  return BookmarksService.isExist(tab.url).then(isExist => {
    console.log("BookmarksService.isExist", tab, isExist)
  })
}).catch(error => {
  console.log("BrowserService.getTabInfo error", error)
})

BookmarksService.getTags().then(tags => {
  console.log("ookmarksService.getTags", tags)
}).catch(error => {
  console.log("BookmarksService.getTags error", error)
})

BookmarksService.getCategories().then(categories => {
  console.log("ookmarksService.getCategories", categories)
}).catch(error => {
  console.log("ookmarksService.getCategories error", error)
})

ReactDom.render(<App />, document.getElementById("main"))

const chrome: any = (window as any).chrome

export interface Tab {
  title: string,
  url: string
}

export function getTabInfo(): Promise<Tab> {
  return new Promise((resolve, reject) => {
    if ((chrome.tabs !== null) && (chrome.tabs !== undefined)) {
      chrome.tabs.query({
        "active": true,
        "lastFocusedWindow": true
      }, (tabs: Tab[]) => {
        resolve(tabs[0])
      })
    } else {
      reject("tabsApi error")
    }
  })
}

export function openNewTab(url: string): void {
  if ((chrome.tabs !== null) && (chrome.tabs !== undefined)) {
    chrome.tabs.create({
      url: url
    })
  }
}

export interface ChromeBookmark {
  dateAdded: number
  id: string
  index: number
  parentId: string
  title: string
  url?: string
  children?: ChromeBookmark[]
}

export function getBookmarks(): Promise<ChromeBookmark[]> {
  return new Promise((resolve, reject) => {
    if ((chrome.tabs !== null) && (chrome.tabs !== undefined)) {
      chrome.bookmarks.getTree(bookmarks => {
        if (bookmarks.length > 0 && bookmarks[0].children.length > 0) {
          const barreDefavoris = (bookmarks[0].children as any[]).filter(c => c.id === "1")
          if (barreDefavoris.length > 0) {
            const allBookmarks = barreDefavoris[0].children as any[]
            const res = allBookmarks.filter(b => !!b.children)
            resolve(allBookmarks)
          } else {
            reject({
              message: "barreDefavoris not found"
            })
          }
        } else {
          reject({
            message: "bookmarks not found"
          })
        }
      })
    } else {
      reject({
        message: "API Errors"
      })
    }
  })
}

export function remove(id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((chrome.tabs !== null) && (chrome.tabs !== undefined)) {
      chrome.bookmarks.remove(id, (err, res) => {
        resolve({err, res})
      })
    } else {
      reject({
        message: "API Errors"
      })
    }
  })
}

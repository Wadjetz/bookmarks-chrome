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

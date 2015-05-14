const chromeApi = chrome;
const tabsApi = chrome.tabs;
const storage = chrome.storage.local

export default {
  openNewTab: function (url) {
    if ((tabsApi !== null) && (tabsApi !== undefined)) {
      tabsApi.create({
        url: url
      });
    }
  },

  getTabInfo: function () {
    return new Promise((resolve, reject) => {
      if ((tabsApi !== null) && (tabsApi !== undefined)) {
        tabsApi.query({
          'active': true,
          'lastFocusedWindow': true
        }, function (tabs) {
          resolve({
            url: tabs[0].url,
            title: tabs[0].title
          })
        });
      } else {
        reject("tabsApi error");
      }
    });
  }
}

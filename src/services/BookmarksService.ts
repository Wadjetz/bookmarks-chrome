export interface Bookmark {
  title: string
  url: string
  description: string
  category: string
  tags: Array<string>
}

export interface Category {
  name: string
}

export interface IsExist {
  exist: boolean
}

function checkStatus(response: Response) {
  console.log("checkStatus", response)
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    throw error
  }
}

function parseJSON(response: Response) {
  return response.json()
}

const BASE_URL = "http://bookmarks.berezovskiy.fr"

const fetchHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

const fetchConfig = {
  credentials: "include",
  headers: fetchHeaders
}

export function saveBookmark(bookmark: Bookmark): Promise<Bookmark> {
  return fetch(`${BASE_URL}/bookmarks`, {
      method: "POST",
      body: JSON.stringify(bookmark),
      credentials: "include",
      headers: fetchHeaders,
    }).then(checkStatus).then(parseJSON)
}

export function getTags(): Promise<Array<string>> {
  return fetch(`${BASE_URL}/bookmarks/tags`)
      .then(checkStatus)
      .then(parseJSON)
}

export function getCategories(): Promise<Array<Category>> {
  return fetch(`${BASE_URL}/bookmarks/categories`, fetchConfig as any)
      .then(checkStatus)
      .then(parseJSON)
}

export function isExist(url: string): Promise<IsExist> {
  return fetch(`${BASE_URL}/bookmarks/exist?url=${url}`, fetchConfig as any)
    .then(checkStatus)
    .then(parseJSON)
}

export function isConnected(): Promise<any> {
  return fetch(`${BASE_URL}/users/connected`, fetchConfig as any)
    .then(checkStatus)
}

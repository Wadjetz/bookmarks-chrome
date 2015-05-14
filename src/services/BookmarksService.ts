import { Bookmark, Category } from "../models"

function checkStatus(response: Response) {
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
  return fetch(`${BASE_URL}/bookmarks/tags`, fetchConfig as any)
      .then(checkStatus)
      .then(parseJSON)
}

export function getCategories(): Promise<Array<Category>> {
  return fetch(`${BASE_URL}/bookmarks/categories`, fetchConfig as any)
      .then(checkStatus)
      .then(parseJSON)
}

export function isExist(url: string): Promise<{ exist: boolean }> {
  return fetch(`${BASE_URL}/bookmarks/exist?url=${url}`, fetchConfig as any)
    .then(checkStatus)
    .then(parseJSON)
}

export function isConnected(): Promise<any> {
  return fetch(`${BASE_URL}/users/connected`, fetchConfig as any)
    .then(checkStatus)
}

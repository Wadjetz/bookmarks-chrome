
export function extractTags(allTags: string[], title: string, url: string): string[] {
  return allTags.filter(tag => {
    return title.includes(tag) || url.includes(tag)
  })
}


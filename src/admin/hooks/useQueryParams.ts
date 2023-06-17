export function useQueryParams(name: string) {
  const urlSearchParams = new URLSearchParams(window.location.search)
  return urlSearchParams.get(name)
}

export async function fetchJson<T>(fetcher: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>, input: RequestInfo | URL, init?: RequestInit | undefined): Promise<T | null> {
  try {
    const response = await fetcher(input, init)
    if (!response.ok) {
      console.error(`Failed to fetch ${input}`, response)
      return null
    }
    const data = (await response.json()) as T
    return data
  } catch (error) {
    console.error('Error while fetching:', error)
    return null
  }
}
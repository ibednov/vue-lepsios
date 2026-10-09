/** Matches go-lepsios/httpx/response.Pagination JSON. */
export type PaginationMeta = {
  page: number
  perPage: number
  totalCount: number
  totalPages: number
}

export const emptyPaginationMeta = (): PaginationMeta => ({
  page: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
})

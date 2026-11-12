export interface BulkActionResult<T> {
  succeeded: number
  failed: T[]
}

/** Run an action for every selected record and return the records that failed. */
export const runBulkAction = async <T>(
  records: T[],
  action: (record: T) => Promise<unknown>,
): Promise<BulkActionResult<T>> => {
  let succeeded = 0
  const failed: T[] = []

  for (const record of records) {
    try {
      await action(record)
      succeeded += 1
    }
    catch {
      failed.push(record)
    }
  }

  return { succeeded, failed }
}

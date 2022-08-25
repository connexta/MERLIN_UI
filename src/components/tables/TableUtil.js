const resolvePath = (object, path) =>
  path.split('.').reduce((o, p) => o?.[p], object)

function descendingComparator(a, b, orderBy, type) {
  let first = resolvePath(a, orderBy)
  let second = resolvePath(b, orderBy)
  if (type === 'date') {
    first = new Date(first)
    second = new Date(second)
  }
  if (second < first) {
    return -1
  }
  if (second > first) {
    return 1
  }
  return 0
}

export const getComparator = (order, orderBy, cells) => (a, b) => {
  const cell = cells.find((cell) => cell.id === orderBy)
  if (cell !== undefined) {
    return order === 'desc'
      ? descendingComparator(a, b, orderBy, cell.type)
      : -descendingComparator(a, b, orderBy, cell.type)
  }
}

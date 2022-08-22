function descendingComparator(a, b, orderBy, type) {
    let first = a[orderBy]
    let second = b[orderBy]
    if (type === 'date') {
        first = new Date(a[orderBy])
        second = new Date(b[orderBy])
    }
    if (second < first) {
        return -1;
    }
    if (second > first) {
        return 1;
    }
    return 0;
}

export const getComparator = (
    order,
    orderBy,
    cells
) => (
    a,
    b,
    ) => {
        const cell = (cells.find((cell) => cell.id === orderBy))
        if (cell !== undefined) {
            return order === 'desc'
                ? descendingComparator(a, b, orderBy, cell.type)
                : -descendingComparator(a, b, orderBy, cell.type)
        }
    }
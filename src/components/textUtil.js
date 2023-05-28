export function printList(list, delimiter = ' - ') {
    return list.filter(t => t !== null && t !== undefined).join(delimiter);
}

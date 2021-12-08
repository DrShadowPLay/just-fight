
export function getNextfreeIndex(array: object[]): number {
    console.log(array + "in neext free index")
    for (let index = 0; index < array.length; index++) {
        if (array[index] == null) {
            return index;
        }
    }
    return array.length;

}

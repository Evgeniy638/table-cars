import { typeActions } from "../types"

export const actionCreatorsTable = {
    changeAllDataWithoutFilters(arrMetaData, matrixColumnData) {
        return {
            type: typeActions.table.CHANGE_ALL_DATA_WITHOUT_FILTERS,
            arrMetaData,
            matrixColumnData
        }
    },
    toggleFilter(titleColumn) {
        return {
            type: typeActions.table.TOGGLE_FILTER,
            titleColumn
        }
    },
    changeSearchField(searchField) {
        return {
            type: typeActions.table.CHANGE_SEARCH_FIELD,
            searchField
        }
    }
}

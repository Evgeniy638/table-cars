import { typeActions } from "../types"

export const actionCreatorsTable = {
    changeAllDataWithoutFilters(arrMetaData, matrixColumnData) {
        return {
            type: typeActions.table.CHANGE_ALL_DATA_WITHOUT_FILTERS,
            arrMetaData,
            matrixColumnData
        }
    }
}

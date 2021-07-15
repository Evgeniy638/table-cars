export const selectorsTable = {
    getTableArrMetaData(state) {
        return state.reducerTable.arrMetaData;
    },
    getTableMatrixColumnData(state) {
        return state.reducerTable.matrixColumnData;
    },
    getSearchField(state) {
        return state.reducerTable.searchField;
    },
    getActiveRowId(state) {
        return state.reducerTable.activeRowId;
    }
}

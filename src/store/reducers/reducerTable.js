import { typeActions } from "../types";

const initialState = {
    arrMetaData: [],
    matrixColumnData: []
}

export const reducerTable = (state = initialState, action) => {
    switch (action.type) {
        case typeActions.table.CHANGE_ALL_DATA_WITHOUT_FILTERS:
            return {
                ...state,
                arrMetaData: action.arrMetaData,
                matrixColumnData: action.matrixColumnData
            }
        default:
            return state;
    }
}

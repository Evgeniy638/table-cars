import { constants } from "../../constants";
import { typeActions } from "../types";

const initialState = {
    arrMetaData: [],
    matrixColumnData: [],
    searchField: ""
}

export const reducerTable = (state = initialState, action) => {
    switch (action.type) {
        case typeActions.table.CHANGE_SEARCH_FIELD:
            return {
                ...state,
                searchField: action.searchField
            }
        case typeActions.table.TOGGLE_FILTER:
            return {
                ...state,
                arrMetaData: state.arrMetaData.map(data => {
                    if (data.titleColumn !== action.titleColumn) {
                        return data;
                    }

                    let typeFilter;

                    if (data.typeFilter === constants.sortColumn.NONE) {
                        typeFilter = constants.sortColumn.ASCEDING
                    } else if (data.typeFilter === constants.sortColumn.ASCEDING) {
                        typeFilter = constants.sortColumn.DESCEDING
                    } else {
                        typeFilter = constants.sortColumn.NONE
                    }

                    return {
                        ...data,
                        typeFilter
                    }
                })
            }
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

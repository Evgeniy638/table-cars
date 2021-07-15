import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../store";
import { utilTable } from "../util/utilTable";

export const useSelectFilterAndSortMatrixData = () => {
    const arrMetaData = useSelector(selectors.getTableArrMetaData);
    let matrixColumnData = useSelector(selectors.getTableMatrixColumnData);

    matrixColumnData = useMemo(() => {
        if (matrixColumnData.length === 0) {
            return matrixColumnData;
        }

        return utilTable.sortMatrixData(matrixColumnData, arrMetaData);
    }, [arrMetaData, matrixColumnData]);

    return matrixColumnData;
}

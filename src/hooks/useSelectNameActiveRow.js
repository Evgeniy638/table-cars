import { useSelector } from "react-redux";
import { selectors } from "../store";

// Возвращает `${марка} ${модель} ${минимальный год}`, если выбран activeRowId, иначе возвращается undefined.
// Как я понял из примера (Выбран автомобиль Audi A4 2005 года выпуска),
// 2005 год это минимальный год среди всех в tariffs.
export const useSelectNameActiveRow = () => {
    const activeRowId = useSelector(selectors.getActiveRowId);
    const matrixColumnData = useSelector(selectors.getTableMatrixColumnData);

    if (!activeRowId) {
        return undefined;
    }

    const indexRow = matrixColumnData[0].findIndex(cellValue => cellValue === activeRowId);

    const markAndModel = matrixColumnData[0][indexRow];

    let minYear = matrixColumnData[1][indexRow];
    
    for(let indexColumn = 2; indexColumn < matrixColumnData.length; indexColumn++) {
        minYear = Math.min(minYear, matrixColumnData[1][indexRow]);
    }

    return `${markAndModel} ${minYear}`;
}

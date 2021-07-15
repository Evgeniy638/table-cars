import { constants } from "../constants";

export const utilTable = {
    transformApiDataToTableData(apiData) {
        const arrMetaData = this.getArrMetaDataByApiData(apiData);
        const matrixColumnData = this.getMatrixDataByApiData(apiData);

        return {
            arrMetaData,
            matrixColumnData
        }
    },

    getArrMetaDataByApiData(apiData) {
        const arrMetaData = apiData.tariffs_list.map((titleColumn, i) => ({
            titleColumn,
            position: constants.positionColumn.CENTER,
            typeFilter: constants.sortColumn.NONE
        }));

        return [
            {
                titleColumn: "Марка и модель",
                position: constants.positionColumn.LEFT,
                typeFilter: constants.sortColumn.NONE
            },
            ...arrMetaData
        ];
    },

    getMatrixDataByApiData(apiData) {
        const brandAndModel = [];
        const tariffsColumms = apiData.tariffs_list.map(() => []);

        apiData.cars.forEach((car) => {
            brandAndModel.push(`${car.mark} ${car.model}`)

            apiData.tariffs_list.forEach((tariff, i) => {
                tariffsColumms[i].push(undefined);
            })

            Object.keys(car.tariffs).forEach(tariff => {
                const indexTariff = apiData.tariffs_list.indexOf(tariff);
                tariffsColumms[indexTariff][brandAndModel.length - 1] = car.tariffs[tariff].year;
            });
        });

        return [
            brandAndModel,
            ...tariffsColumms
        ]
    },

    // сортировка может быть по нескольким колонкам, 
    // тогда чем левее колонка (меньше индекс в arrMetaData), тем больше приоритет.
    sortMatrixData(matrixColumnData, arrMetaData) {
        let resMatrix = this.transpose(matrixColumnData);

        [...arrMetaData].reverse().forEach(({ typeFilter }, i) => {
            const indexColumn = arrMetaData.length - i - 1;

            if (typeFilter === constants.sortColumn.NONE) {
                return;
            }

            resMatrix.sort((row1, row2) => {
                const resCompareCell = this.compareCell(row1[indexColumn], row2[indexColumn]);
                const isDesceding = typeFilter === constants.sortColumn.DESCEDING;

                return isDesceding ?-resCompareCell :resCompareCell;
            })
        });

        return this.transpose(resMatrix);
    },

    transpose(matrix) {
        const resMatrix = [...matrix[0].map(() => [])];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                resMatrix[j][i] = matrix[i][j];
            }
        }

        return resMatrix;
    },

    compareCell(cell1, cell2) {
        if (cell1 === cell2) {
            return 0;
        }

        if (!cell1) {
            return -1;
        }

        if (!cell2) {
            return 1;
        }

        return cell1 > cell2 ?1 :-1;
    },

    filterMatrixData(matrixColumnData, searchField) {
        const lowerSearchField = searchField.toLowerCase();

        let resMatrix = this.transpose(matrixColumnData).filter((row) => {
            return row.some(cellValue => {
                const lowerCell = String(cellValue).toLowerCase();
                return lowerCell && lowerCell.includes(lowerSearchField);
            });
        });

        return resMatrix.length > 0 ?this.transpose(resMatrix) :resMatrix;
    }
}

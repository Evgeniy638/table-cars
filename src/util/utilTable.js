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
            position: i === 0 ?constants.positionColumn.LEFT :constants.positionColumn.CENTER,
            typeFilter: constants.filterColumn.NONE
        }));

        return arrMetaData;
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
    }
}

import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Message from "../Message/Message";
import style from "./Main.module.css";
import Table from "../Table/Table";
import { useCallback, useEffect } from "react";
import { apiTable } from "../../api";
import { utilTable } from "../../util/utilTable";
import { useSelector } from "react-redux";
import { actionCreators, selectors, store } from "../../store";
import { useDispatch } from "react-redux";

const Main = () => {
    const arrMetaData = useSelector(selectors.getTableArrMetaData);
    const matrixColumnData = useSelector(selectors.getTableMatrixColumnData);

    const dispatch = useDispatch();

    const changeAllDataWithoutFilters = useCallback((arrMetaData, matrixColumnData) => {
        dispatch(actionCreators.table.changeAllDataWithoutFilters(arrMetaData, matrixColumnData));
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const apiData = await apiTable.getCarsData();
            const { arrMetaData, matrixColumnData } = utilTable.transformApiDataToTableData(apiData);
            changeAllDataWithoutFilters(arrMetaData, matrixColumnData);
        })();
    }, []);

    return (
        <div className={style.Main}>
            <div className={style.Main__container}>
                <div className={style.searchField}>
                    <div className={style.searchField__input}>
                        <SearchInput placeholder="Найти" />
                    </div>

                    <Button text="Найти" onClick={() => { }} />
                </div>
            </div>

            <div className={`${style.Main__container} ${style.Main__table}`}>
                <Table
                    arrMetaData={arrMetaData}
                    matrixColumnData={matrixColumnData}
                    arrRowId={matrixColumnData[0]}
                />
            </div>

            <div className={style.Main__container}>
                <Message text="Выбран автомобиль Audi A4 2005 года выпуска" />
            </div>
        </div>
    )
}

export default Main;

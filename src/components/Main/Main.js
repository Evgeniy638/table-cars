import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Message from "../Message/Message";
import style from "./Main.module.css";
import Table from "../Table/Table";
import { useCallback, useEffect } from "react";
import { apiTable } from "../../api";
import { utilTable } from "../../util/utilTable";
import { useSelector } from "react-redux";
import { actionCreators, selectors } from "../../store";
import { useDispatch } from "react-redux";
import { useSelectFilterAndSortMatrixData } from "../../hooks/useSelectFilterAndSortMatrixData";

const Main = () => {
    const arrMetaData = useSelector(selectors.getTableArrMetaData);
    const matrixColumnData = useSelectFilterAndSortMatrixData();

    const dispatch = useDispatch();

    const changeAllDataWithoutFilters = useCallback((arrMetaData, matrixColumnData) => {
        dispatch(actionCreators.table.changeAllDataWithoutFilters(arrMetaData, matrixColumnData));
    }, [dispatch]);

    const toggleFilter = useCallback((titleColumn) => {
        dispatch(actionCreators.table.toggleFilter(titleColumn));
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const apiData = await apiTable.getCarsData();
            const { arrMetaData, matrixColumnData } = utilTable.transformApiDataToTableData(apiData);
            changeAllDataWithoutFilters(arrMetaData, matrixColumnData);
        })();
    }, []);

    
    const onClickHeaderColumn = useCallback((titleColumn) => {
        toggleFilter(titleColumn);
    }, [toggleFilter]);

    const onClickCell = useCallback((idRow, titleColumn) => {
        console.log(idRow, titleColumn);
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
                    onClickCell={onClickCell}
                    onClickHeaderColumn={onClickHeaderColumn}
                />
            </div>

            <div className={style.Main__container}>
                <Message text="Выбран автомобиль Audi A4 2005 года выпуска" />
            </div>
        </div>
    )
}

export default Main;

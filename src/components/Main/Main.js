import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Message from "../Message/Message";
import style from "./Main.module.css";
import Table from "../Table/Table";
import { useCallback, useEffect, useState } from "react";
import { apiTable } from "../../api";
import { utilTable } from "../../util/utilTable";
import { useSelector } from "react-redux";
import { actionCreators, selectors } from "../../store";
import { useDispatch } from "react-redux";
import { useSelectFilterAndSortMatrixData } from "../../hooks/useSelectFilterAndSortMatrixData";

const Main = () => {
    const arrMetaData = useSelector(selectors.getTableArrMetaData);
    const searchFieldStore = useSelector(selectors.getSearchField);
    const matrixColumnData = useSelectFilterAndSortMatrixData();

    const [searchField, changeSearchField] = useState(searchFieldStore);

    const dispatch = useDispatch();

    const changeAllDataWithoutFilters = useCallback((arrMetaData, matrixColumnData) => {
        dispatch(actionCreators.table.changeAllDataWithoutFilters(arrMetaData, matrixColumnData));
    }, [dispatch]);

    const toggleFilter = useCallback((titleColumn) => {
        dispatch(actionCreators.table.toggleFilter(titleColumn));
    }, [dispatch]);

    const changeSearchFieldStore = useCallback((searchField) => {
        dispatch(actionCreators.table.changeSearchField(searchField));
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

    const search = () => {
        changeSearchFieldStore(searchField);
    }

    const onKeypressSearchInput = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }

    return (
        <div className={style.Main}>
            <div className={style.Main__container}>
                <div className={style.searchField}>
                    <div className={style.searchField__input}>
                        <SearchInput
                            value={searchField}
                            onChange={changeSearchField}
                            onKeypress={onKeypressSearchInput}
                            placeholder="Найти"
                        />
                    </div>

                    <Button text="Найти" onClick={search} />
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
            
            {
                searchFieldStore && matrixColumnData.length === 0 && arrMetaData.length > 0 &&
                <div className={style.Main__container}>
                    <Message text={`${searchFieldStore} не найдено`}/>    
                </div>
            }

            <div className={style.Main__container}>
                <Message text="Выбран автомобиль Audi A4 2005 года выпуска" />
            </div>
        </div>
    )
}

export default Main;

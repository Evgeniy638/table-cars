import Button from "../Button/Button";
import SearchInput from "../SearchInput/SearchInput";
import Message from "../Message/Message";
import style from "./Main.module.css";
import Table from "../Table/Table";
import { arrMetaData, arrRowId, matrixColumnData } from "./mock";

const Main = () => {
    return (
        <div className={style.Main}>
            
            <div className={style.Main__container}>
                <div className={style.searchField}>
                    <div className={style.searchField__input}>
                        <SearchInput placeholder="Найти"/>
                    </div>

                    <Button text="Найти" onClick={() => {}}/>
                </div>
            </div>

            <div className={style.Main__container}>
                <Table 
                    arrMetaData={arrMetaData}
                    matrixColumnData={matrixColumnData}
                    arrRowId={arrRowId}
                />
            </div>

            <div className={style.Main__container}>
                <Message text="Выбран автомобиль Audi A4 2005 года выпуска"/>
            </div>
        </div>
    )
}

export default Main;

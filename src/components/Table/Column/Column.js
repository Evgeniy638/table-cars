import { constants } from "../../../constants";
import Cell from "../Cell/Cell";
import svgFilter from "../filter.svg";

const getClassHeaderCellByPosition = (position) => {
    return position === constants.positionColumn.CENTER
        ? "Table__cell_center"
        : "";
}

const getClassHeaderImgByFilter = (filter) => {
    return filter === constants.filterColumn.DESCEDING
        ? "Table__header-filter-icon_desceding"
        : "";
}

const Column = ({ metaData, arrColumnData, arrRowId }) => {
    return (
        <div className="Table__column">
            <h3 className={`Table__cell Table__header-cell ${getClassHeaderCellByPosition(metaData.position)}`}>
                {metaData.titleColumn}
                {
                    metaData.typeFilter !== constants.filterColumn.NONE &&
                    <img
                        className={`Table__header-filter-icon ${getClassHeaderImgByFilter(metaData.typeFilter)}`}
                        src={svgFilter}
                        alt="filter"
                    />
                }
            </h3>

            <div>
                {
                    arrColumnData.map((text, i) => (
                        <Cell
                            key={arrRowId[i]}
                            text={text}
                            id={arrRowId[i]}
                            isCenter={metaData.position === constants.positionColumn.CENTER}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Column;

import { useCallback } from 'react';
import Column from './Column/Column';
import './Table.css';

const Table = ({ 
    arrMetaData, matrixColumnData, arrRowId, 
    onClickHeaderColumn = (titleColumn) => {},
    onClickCell = (idRow, titleColumn) => {}  
}) => {
    const onClickTable = useCallback((e) => {
        const headerCell = e.target.closest(".Table__header-cell");

        if (headerCell) {
            const tableColumn = headerCell.closest(".Table__column");
            onClickHeaderColumn(tableColumn.dataset.titleColumn);
            return false;
        }

        const cell = e.target.closest(".Table__cell");

        if (cell) {
            const tableColumn = cell.closest(".Table__column");
            onClickCell(cell.dataset.id, tableColumn.dataset.titleColumn);
        }
    }, [onClickHeaderColumn, onClickCell]);

    return (
        <div className="Table" onClick={onClickTable}>
            {
                arrMetaData.map((metaData, i) => (
                    <Column 
                        key={metaData.titleColumn}
                        metaData={metaData}
                        arrColumnData={matrixColumnData[i]}
                        arrRowId={arrRowId}
                    />
                ))
            }
        </div>
    )
}

export default Table;

import Column from './Column/Column';
import './Table.css';

const Table = ({ arrMetaData, matrixColumnData, arrRowId }) => {
    return (
        <div className="Table">
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

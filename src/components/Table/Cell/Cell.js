const Cell = ({id, text, isCenter}) => {
    return (
        <div className={`Table__cell ${isCenter ?"Table__cell_center" :""}`} data-id={id}>
            {text || "—"}
        </div>
    )
}

export default Cell;

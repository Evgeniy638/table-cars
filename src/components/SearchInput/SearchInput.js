import "./SearchInput.css";
import svgSearch from './search.svg';

const SearchInput = ({value, onChange, onKeypress, placeholder}) => {
    const onChangeHandler = (e) => {
        onChange(e.target.value);
    }

    return (
        <div className="SearchInput">
            <img className="SearchInput__image" src={svgSearch} alt="search"/>
            <input
                className="SearchInput__input"
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
                onKeyPress={onKeypress}
            />
        </div>
    )
}

export default SearchInput;

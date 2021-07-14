import "./SearchInput.css";
import svgSearch from './search.svg';

const SearchInput = ({value, onChange, placeholder}) => {
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
            />
        </div>
    )
}

export default SearchInput;

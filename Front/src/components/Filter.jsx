const Filter = ({ searchedPerson, handleSearchPerson }) => {
    return (
        <div>
            <div>
                filter shown with: <input value={searchedPerson} onChange={handleSearchPerson} />
            </div>
        </div>
    )
}
export default Filter
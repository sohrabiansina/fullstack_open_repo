const PersonFrom = ({ newName, handleChangeName, handleChangeNum, num }) => {
    return (
        <div>
            <div>
                name: <input value={newName} onChange={handleChangeName} />

                <div>number:  <input value={num} onChange={handleChangeNum} /></div>
            </div>
        </div>
    )
}
export default PersonFrom
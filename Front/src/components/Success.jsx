const Success = ({ message }) => {
    // console.log('in Success, message: ', message)
    console.log('success message:',message)
    if (message === '') {
        return (
            <div></div>
        )
    } else {
        const successStyle = {
            marginTop: '15px',
            color: 'green',
            backgroundColor: '#bdc3c7',
            fontSize: '18px',
            border: '1px solid green',
            padding: '18px',
            borderRadius: "3px"
        }
        if (message === null) {
            return null
        }
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }
}
export default Success
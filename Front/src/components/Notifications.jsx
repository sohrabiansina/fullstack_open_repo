import { useEffect, useState } from "react"
const Notifications = ({ messageOfSuccess, messageOfFail }) => {
    let [visible, setVisible] = useState(true)
    useEffect(() => {
        setVisible(true)
        let timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        return () => {
            clearTimeout(timer) // 
            console.log('cleaned up: old timer cleaned!')
        }
    }, [messageOfFail, messageOfSuccess])

    const successOperationStyle = {
        border: '3px solid  #20bf6b',
        backgroundColor: "#d1d8e0",
        padding: '20px',
        margin: '10px 0 10px 0',
        color: '#6ab04c',
        borderRadius: '5px'

    }
    const failedOperationStyle = {
        border: '3px solid #e84118',
        backgroundColor: "#d1d8e0",
        padding: '20px',
        margin: '10px 0 10px 0',
        color: '#e84118',
        borderRadius: '5px'

    }
    return (
        <div>
            {messageOfFail && visible && !messageOfSuccess && (
                <div style={failedOperationStyle} >{messageOfFail}</div>
            )}
            {messageOfSuccess && visible && !messageOfFail && (
                <div style={successOperationStyle} >{messageOfSuccess}</div>
            )}
            {messageOfFail && messageOfSuccess && visible && (
                <div style={failedOperationStyle} >{messageOfFail}</div>
            )}
        </div>
    )
}
export default Notifications
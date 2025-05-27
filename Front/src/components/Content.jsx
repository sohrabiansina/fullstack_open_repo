import { useState } from "react"
import Part from "./Part"
const Content = ({ content }) => {

    let arrayOfValueOfExcercieses = content.map((c) => {
        return c.exercises
    })
    
    const totall = arrayOfValueOfExcercieses.reduce(
        (accumulator, currentValue) =>  accumulator + currentValue
    );
    console.log(totall)

   
    return (
        <div>
            {content.map((c, index) => {
                return <Part key={index} score={c.exercises} name={c.name} />
            })}
            
            <h2>total of {totall} exercises</h2>
        </div>
    )
}
export default Content
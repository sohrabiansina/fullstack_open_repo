import Header from "./Header"
import Content from "./Content"
const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header title={course.name} ></Header>
            <Content content={course.parts} />
            <Header />
        </div>
    )
}
export default Course
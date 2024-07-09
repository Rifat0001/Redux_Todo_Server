import TodoContainer from "../components/todo/TodoContainer";
import Container from "../components/ui/Container";

const Todo = () => {
    return (
        <Container>
            <h1 className="font-semibold text-3xl text-center py-10">Add Todo</h1>
                <TodoContainer />
        </Container>
    );
};

export default Todo;
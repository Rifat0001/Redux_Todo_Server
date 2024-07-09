import { useState } from "react";
import { useGetTodosQuery } from "../../redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
    const [priority, setPriority] = useState('');
    console.log('priority:', priority)
    const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
    if (isLoading || isError) {
        <p>loading data</p>
    }

    return (
        <div>
            <div className="flex justify-between mb-5 ">
                <AddTodoModal />
                <TodoFilter priority={priority} setPriority={setPriority} />
            </div>
            <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
                <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
                    {todos?.data?.length ?
                        todos?.data?.map((item) => (
                            <TodoCard key={item.id}  {...item} />
                        )) :
                        <p className="color-green-500">There is no task pending</p>}
                </div>
            </div>
        </div>
    );
};

export default TodoContainer;
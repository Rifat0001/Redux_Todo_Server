import { useDeleteTodoMutation, useUpdateTodoMutation } from "../../redux/api/api";
import { useAppDispatch } from "../../redux/hook";
import { Button } from "../ui/button";
import UpdateTodoModal from "./UpdateTodoModal";

type TTodoCardProps = {
    _id: string;
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
    priority: string;
};

const TodoCard = ({ title, description, _id, id, isCompleted, priority }: TTodoCardProps) => {
    const [updateTodo, { isLoading, isError }] = useUpdateTodoMutation();
    const [deleteTodo, { }] = useDeleteTodoMutation();
    const dispatch = useAppDispatch();
    const toggle = () => {
        const taskData = {
            title,
            description,
            priority,
            isCompleted: !isCompleted,
        }

        const options = {
            id: _id,
            data: {
                title,
                description,
                priority,
                isCompleted: !isCompleted,
            },
        };

        updateTodo(options)
        console.log('options', options);

    }

    const updatedInfo = (id) => {
        console.log(id)
    }

    const deleteTodoFunc = (id: string) => {
        console.log('deleted', id);
        deleteTodo(id)
    }

    return (
        <div className="bg-white rounded-md flex justify-between items-center p-3 border">
            <input
                className="mr-3"
                onChange={toggle}
                type="checkbox"
                name="complete"
                id="complete"
                defaultChecked={isCompleted}
            />
            <div className="flex-1">
                <p className="font-semibold">{title}</p>
            </div>
            <div className="flex-1 ms-10">
                <div>
                    {isCompleted ? (
                        <p className="text-green-500 font-semibold ">Done</p>
                    ) : (
                        <p className="text-red-500 font-semibold ">Pending</p>
                    )}
                </div>
            </div>

            <div className="flex-1 flex justify-start gap-3 items-center">
                <div className={` h-2 w-2 rounded
                    ${priority === 'high' ? 'bg-red-500' : ''}
                    ${priority === 'medium' ? 'bg-yellow-500' : ''}
                    ${priority === 'low' ? 'bg-green-500' : ''}
                    `}>
                </div>
                <p>{priority}</p>
            </div>

            <div className="flex-[2]">
                <p>{description}</p>
            </div>

            <div className="space-x-5">
                <Button onClick={() => deleteTodoFunc(_id)} className="bg-red-500">
                    <svg
                        className="size-5"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        ></path>
                    </svg>
                </Button>
                <UpdateTodoModal _id={_id} title={title} description={description} priority={priority} />
            </div>
        </div>
    );
};

export default TodoCard;
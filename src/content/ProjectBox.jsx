import { useContext, useState } from "react";
import { useModalContext, useProjectContext } from "../context/project-context";
import { toast } from 'react-toastify'

export default function ProjectBox({ color, title, items}) {
    const[order, setOrder] = useState( 'descending' );
    const modal = useModalContext();
    const project = useProjectContext();  

    const onCancel = () => {
        toast.dismiss();
    }

    const onDelete = id => {
        project.ProjectDispatch({
            type: 'delete',
            payload: id
        });
        toast.dismiss();
    }

    const displayedItems = items.sort( (a,b) => {
        return order === 'descending' ? b.dueDate - a.dueDate : a.dueDate - b.dueDate
    });

    const handleDeleteItem = (item) => {
        toast(
            <div className="py-8">
                <p className="mb-4">
                    You are going to delete the task: <span className="font-bold">{item.title}</span>. <br /> Are you sure?
                </p>
                <div className="flex justify-center gap-4">
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                        Delete
                    </button>
                </div>
            </div>,
            { 
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                closeButton: false,
                type: 'error'
            }
        )
    }

    const itemList = displayedItems.map( item => {
        return(
            <div key={item.id} className="mb-4 rounded-lg bg-gray-800 p-4">
                <div className="flex justify-between">
                    <h4 className="mb-2 flex-1 font-semibold text-indigo-500">{ item.title }</h4>

                    <div className="flex gap-2">
                        <svg
                            onClick={()=> handleDeleteItem(item)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 cursor-pointer text-zinc-300"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path
                                d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        <svg
                            onClick={ () => {
                                modal.modalDispatch({
                                    type: 'open',
                                    payload: {
                                        item,
                                        isNew: false
                                    }
                                });
                                // project.ProjectDispatch({
                                //     type: 'open',
                                //     // item: 
                                // });
                            }}
                            className="h-4 w-4 cursor-pointer text-zinc-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <p className="mb-2 text-sm text-zinc-200">{ item.description }</p>

                <p className="mt-6 text-xs text-zinc-400">
                    {
                        new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                        }).format(item.dueDate)
                    }
                </p>
            </div>
        )
    });

    return (
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
            <div className={`rounded-lg ${color} p-4`}>
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{ title } ({items.length})</h3>
                    { items.length > 0 && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`icon icon-tabler icons-tabler-outline icon-tabler-sort-${order}`}
                            onClick={ () => {
                                setOrder(order === 'ascending'? 'descending' : 'ascending');
                            }}
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 6l9 0" />
                            <path d="M4 12l7 0" />
                            <path d="M4 18l7 0" />
                            <path d="M15 15l3 3l3 -3" />
                            <path d="M18 6l0 12" />
                        </svg>
                    )}
                </div>
                
                <div>
                    { 
                        items.length ? 
                            itemList :  
                            (<>
                                <div className="mb-4 rounded-lg bg-gray-800 p-4">
                                    <div className="flex justify-between">
                                        <h4 className="mb-2 text-sm text-zinc-200">No Items Found</h4>
                                    </div>
                                </div>
                            </>)
                    }
                </div>

                {/* <!-- Add more task cards here --> */}
            </div>
        </div>
    )
}
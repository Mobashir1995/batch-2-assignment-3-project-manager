import { useContext, useState } from "react"
import { useModalContext, useProjectContext } from "../context/project-context";

export default function ModalBox() {
    const [ error, setError ] = useState({
        title: false,
        description: false,
        dueDate: false,
        category: false,
    });

    const modal = useModalContext();
    const project = useProjectContext();
    const item = modal.data.editedItem || {} ;
    const isNew = modal.data.isNew || false ;
    const handleChange = e => {
        let { name, value } = e.target;
        if( e.target.name === 'dueDate' ) {
            value = new Date( value );
        }

        if( e.target.value === '' ) {
            setError({...error, [name]: true });
        }else{
            setError({...error, [name]: false });
        }
        const editedItem = {
            ...item,
            [name]: value
        };
        modal.modalDispatch({
            type: "updating",
            payload: { 
                item: editedItem,
                isNew
            }
        })
    }

    const onHandleSubmit = e => {
        e.preventDefault();

        if( Object.keys(item).length === 0 ) {
            setError({
                title: true,
                description: true,
                dueDate: true,
                category: true,
            });
            return;
        }

        Object.entries(item).forEach(([key, value]) => {
            if( value === undefined || value === '' ) {
                setError({...error, [key]: true });
            }
        });

        if( error.title || error.description || error.dueDate || error.category ) {
            return false;
        }
        
        const type = isNew ? 'insert' : 'update';
        const payload = isNew ? {...item, id: crypto.randomUUID()} : item;
        project.ProjectDispatch({
            type,
            payload
        });
        modal.modalDispatch({
            type: "close"
        });
        setError({
            title: false,
            description: false,
            dueDate: false,
            category: false,
        });
    }
    return(
        <div className={`${!modal.data.open && 'hidden'} flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white fixed top-0 left-0 w-full`}>
            <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
                <div className="p-6">
                    <h2 className="mb-6 text-2xl font-bold text-green-400">Create Task</h2>
                    <form onSubmit={onHandleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >Task Name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={ item.title || ''}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span 
                            className={`${ error.title ? 'block' : 'hidden' } mt-1 text-xs text-red-500 p-1`}
                        >This is a required field</span>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={ item.description || ''}
                            onChange={handleChange}
                            rows={3}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span 
                            className={`${ error.description ? 'block' : 'hidden' } mt-1 text-xs text-red-500 p-1`}
                        >This is a required field</span>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="dueDate"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            onChange={handleChange}
                            value={ item.dueDate ? new Date( item.dueDate ).toLocaleDateString('en-CA') : '' }
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span 
                            className={`${ error.dueDate ? 'block' : 'hidden' } mt-1 text-xs text-red-500 p-1`}
                        >This is a required field</span>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="mb-1 block text-sm font-medium text-gray-300"
                        >Category</label>
                        <select
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={ item.category || "" }
                            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select a Category</option>
                            <option value="to-do">To-Do</option>
                            <option value="in-progress">On Progress</option>
                            <option value="completed">Done</option>
                            <option value="revise">Revised</option>
                        </select>
                        <span 
                            className={`${ error.category ? 'block' : 'hidden' } mt-1 text-xs text-red-500 p-1`}
                        >This is a required field</span>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={ () => {
                                modal.modalDispatch({
                                    type: 'close'
                                });
                                setError({
                                    title: false,
                                    description: false,
                                    dueDate: false,
                                    category: false,
                                });
                            } }
                            type="button"
                            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            { isNew ? 'Create' : 'Update' } Task
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
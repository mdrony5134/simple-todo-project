import { useEffect } from "react";
import { useState } from "react";


// get item local storage
const getItemLocal = () =>{
    let item = localStorage.getItem('list')
    // console.log(item)
    if(item){
        return JSON.parse(localStorage.getItem('list'))
    }else{
        return []
    }
}


const Todo = () => {
    const [todo, setTodo] = useState(getItemLocal())
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const handelAddTodo = () =>{
        if(title && description){
            setTodo((pre)=>[
                ...pre,
                {
                    title,
                    description,
                }
            ])                          // [...todo, title, description]
        }
        setTitle('')
        setDescription('')
    }

    const handelDelete = (index) =>{
        console.log(index)
        const updateTodo = todo.filter((ele,i)=>{
        return index !== i;
        })
        setTodo(updateTodo)
    }

//  set item to local storage

    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify(todo))
    },[todo])



    return (
        <>
            <h1>My Todo App</h1>

            <div className="todo-wrapper">
            <div className="todo-input">
                
               <div className="todo-input-item">
               <input 
                type="text" 
                placeholder="Title..."
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />
               </div>
               <div className="todo-input-item">
               <input 
                type="text" 
                placeholder="Description..."
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                />
               </div>

                <button className="primary-btn" onClick={handelAddTodo}>Add</button>
            </div>

            <div className="todo-list">

                <h1 className="secondaryBtn">Tod List </h1>   

                 {todo.map(({title, description}, index)=>{
                    return(
                        <div className="todo-list-item" key={index}>
                            <div>
                            <h1>{title}</h1>
                            <p>{description}</p>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn" onClick={()=>handelDelete(index)}>Delete</button>
                            </div>
                        </div>
                    )
                 })}
               
            </div>

            </div>
        </>
    );
};

export default Todo;
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react";
import  ReactDOM from "react-dom";
import {v4 as uuid} from "uuid";
import "./App.css"
const App=()=>{
    const [search,setSearch]=useState("");
    const [todo,setTodo]=useState("");
    const [todos,setTodos]=useState([]);
    const [cat,setCat]=useState("");
    const [date,setDate]=useState("");
    const [catsearch,setcatSearch]=useState("");
    const [searchdate,setsearchDate]=useState("");
    useEffect(()=>{
        const items=JSON.parse(localStorage.getItem('store'));
        if(items){
            setTodos(items);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("store",JSON.stringify(todos))
    },[todos])
    const ADDME=()=>{


        const id=uuid()
        setTodos([...todos,{id:id,task:todo,cat:cat,time:date}]);
        

     }
     const Delete=(id)=>{
        setTodos(todos.filter((t)=>t.id!==id))
     }
     const markdown=(id)=>setTodos(todos.map((t)=>{ 
        if(t.id==id) {
            t.status=!t.status
        }
        return t
     }))
    return (<>
    <div className="container"> 
    <input placeholder="Write your task here" id="t1"value={todo} onChange={(e)=> setTodo(e.target.value)}/> <br/>
      <input placeholder="Type Category" id="t2"value={cat} onChange={(e)=> setCat(e.target.value)} />  <br/>
      <input type="date" id="t3" value={date} onChange={(e)=> setDate(e.target.value)}/> <br/>
       <button onClick={ADDME} id="t4">ADD YOUR TASK</button>      
        <input placeholder="Search" id="t5" value={search} onChange={(e)=> setSearch(e.target.value)}/> 
        <input placeholder="Category Search" id="t6"value={catsearch} onChange={(e)=> setcatSearch(e.target.value)}/> 
        <input type="date" id="t7"value={searchdate} onChange={(e)=> setsearchDate(e.target.value)}/> 
    <ol>
        { 
        
        searchdate.length==0  &&  catsearch.length==0 && search.length==0&&todos.map((i)=>{
           return <li>
            <input type="checkbox" onClick={()=>markdown(i.id)}/>
            {""}{i.status===true?<s>{i.task} {""} </s>:i.task}  {i.status===true?<s>{i.time} 
            {""} </s>:i.time}   {i.status===true?<s>{i.cat} {""}</s>:i.cat}  
            {""}<button onClick={()=>Delete(i.id)}>Delete</button> 
            </li>
        })
        
    }
    </ol>
   
    <ol>
        { 
       
            
          
       searchdate.length==0  && catsearch.length==0&& search.length>0&&todos.map((t)=>{
            return(<>
                {
                    t.task.includes(search)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol>
    <ol>
        { 
       
            
          
       searchdate.length==0 &&search.length==0 && catsearch.length>0 && todos.map((t)=>{
            return(<>
                {
                    t.cat.includes(catsearch)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol>
    <ol>
        { 
       
            
          
       searchdate.length>0 &&  search.length==0 && catsearch.length==0 && todos.map((t)=>{
            return(<>
                {
                    t.time.includes(searchdate)?
                    <li>{t.task} {t.cat} {t.time}</li>:''
                }</>
            )
        }
        )
    
    }
    </ol>
    </div> </>) 
}



ReactDOM.render(<App/>, document.getElementById("root"));
   



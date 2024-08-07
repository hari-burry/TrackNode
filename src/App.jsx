import { useEffect, useState } from 'react'
import './App.css'
import List from './list.jsx';

function App() {
  const [txt,setTxt]=useState("");
  const [arr,setArr]=useState([]);
  const [upd,setUpd]=useState(false);
  const [addi,setAddi]=useState(true);
  const [ind,setInd]=useState(null);
  const [msg,setMsg]=useState("");
  useEffect(()=>{
    let list = localStorage.getItem('list');
    
    if (list) {
      setArr(JSON.parse(list));
      console.log('List exists');
    } else {
      localStorage.setItem('list', JSON.stringify([]));
      console.log('List is created');
    }


  },[])

  function add(){
    if(txt.trim()===""){
      setMsg("Empty Value is Invalid");
      setTimeout(()=>{
        setMsg("");

      },2000);
      return;
    }
  const newarr=[...arr,txt];
    setArr(newarr);
    localStorage.setItem("list",JSON.stringify(newarr));
    setTxt("");


  }

  function del(index){
    const newarr=arr.filter((_,i)=>i!=index);
    setArr(newarr);
    localStorage.setItem('list',JSON.stringify(newarr));

  }

  function edit(index){
    setTxt(arr[index]);
    setInd(index);
    setUpd(true);
    setAddi(false);



  }

  function update(){
    if(txt.trim()===''){
      setMsg("Empty Value is Invalid");
      setTimeout(()=>{
        setMsg("");

      },2000);
    return;
    }
    const newarr=arr.map((val,i)=>i===ind?txt:val);
    setArr(newarr);
    localStorage.setItem('list',JSON.stringify(newarr));
    setUpd(false);
    setAddi(true);
    setTxt("");
    setInd(null);


  }

  function deleteall(){
    localStorage.setItem('list',JSON.stringify([]));
    setArr([]);
  }
  return (


    <>
    <div className='header'>
      <div>
    <h1 className='titl'>TrackNode</h1>
    <h5 className='sign'>Made with React</h5>
    </div>
   {msg.length>0 &&<h2 className='msg'>{msg}</h2>}
    <button
    onClick={()=>deleteall()}
    className='add2'>Delete All</button>
    </div>

    <div className='search'>
    <input className='txt'
    placeholder='Add a task'
    onKeyDown={(event)=>{
      if(event.key==="Enter"){
        event.preventDefault();
        if(addi){
          add();
        }
        if(upd){
          update();
        }

      }
    }}
    value={txt}
    onChange={(e)=>setTxt(e.target.value)}
    ></input>
    {addi&&
    <button
    onClick={add}
    className='add'>Add Task</button>
}
    {upd&&
    <button
    onClick={()=>update()}
    className='add3'>
      Update here
    </button>
}
    </div>
    {arr.length>0 &&
    <div className='listdiv'>
    {
      arr.map((value,index)=>(
        <div key={index} className={index === ind ? 'ele2' : 'ele'}>
        <h2 className='text'>{value}</h2>
        <div className='butt'>
        <button 
        onClick={()=>edit(index)}
        className='btn'>
        <svg  className='ed'width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
        <button
        onClick={()=>del(index)}
        className='btn'>
        <svg className='dd'width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 12V17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 7H20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </button>
        </div>
    </div>
     ))
    }
    </div>
}

    </>
  )
}

export default App

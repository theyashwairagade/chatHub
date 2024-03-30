import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Moment from 'react-moment';

const ChatRoom = () => {
    const location=useLocation();
    const [data,setData]=useState({});
    const [message,setMessage]=useState("");
    const [allMessages,setAllMessages]=useState([]);

    useEffect(()=>{
        setData(location.state);
    },[location])
    const handleChange=e=>setMessage(e.target.value);
    const onSubmit=()=>{
        const newMessage={time:new Date(),message,name:data.name}
        console.log(newMessage.time);
        setAllMessages([...allMessages,newMessage])
    }
  return (
    <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container">
        <div className="text-center px-3 mb-4 text-capitalize">
            <h1 className="text-warning mb-4">{data?.room} Chat Room</h1>
        </div>
        <div className="bg-light border rounded p-3 mb-4" style={{height:"450px",overflowY:"scroll"}}>
            {
                allMessages.map(message=>{
                    return data.name===message.name?
                    <div className="row justify-content-end pl-5">
                        <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
                            <h4 className="m-1">{message.message}</h4>
                            <small className="text-muted"><Moment date={message.time} format="hh:mm"/></small>
                        </div>
                    </div>
                    :
                    <div className="row justify-content-start">
                        <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto">
                            <div>
                                <strong className="m-1">{message.name}</strong>
                                <small className="text-muted"><Moment date={message.time} format="hh:mm"/></small>
                            </div>
                            <h4 className="m-1">{message.message}</h4>
                        </div>
                    </div>
                })
            }
            
            
        </div>
        <div className="form-group d-flex">
            <input type="text" className="form-control bg-light" name="message" placeholder="Enter message" onChange={handleChange} value={message}/>
            <button type="button" className="btn btn-warning mx-2" onClick={onSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
            </button>
        </div>
    </div>
  )
}

export default ChatRoom
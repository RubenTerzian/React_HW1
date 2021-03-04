import './App.css';
import React, {useState} from 'react'
import { userData } from './userData';


const User = ({user, showModal, renderModal}) =>{
  return(
    <div className="card" onClick={()=>{
      renderModal(user);
      showModal()
    }} >
        <img src={user.picture} alt="user_image"/>
        <h4>Name: {user.name}</h4>
        <p>Age: {user.age} y.o.</p>
        <p>Gender: {user.gender}</p>
        <p>Balance: {user.balance}</p>
    </div>
  )
}

const Modal = ({isActive, showModal, modalData})=>{
  return isActive ? (
    <div className="modal active">
      <div className="container">
          <button  onClick={showModal}>X</button>
          <div className="left">
            <img src={modalData.picture} alt="user_image"/>
          </div>
          <div className="right">
            <h4>Name: {modalData.name}</h4>
            <p>Age: {modalData.age} y.o.</p>
            <p>Gender: {modalData.gender}</p>
            <p>Balance: {modalData.balance}</p>
            <p>Email: {modalData.email}</p>
            <p>Phone: {modalData.phone}</p>
            <p>Address: {modalData.address}</p>
            <p>Company: {modalData.company}</p>
            <p>Friends:</p>
            <ul>
              {modalData.friends.map(fr =>{
                return <li key={"friend_id"+fr.id}>{fr.name}</li>
              })}
            </ul>
          </div>
      </div>
    </div>
  ):(
    <div className="modal"></div>
  )
}

const UsersList = ({arrayForRender, showModal, renderModal})=>{
  return (
    <>
      {arrayForRender.map(user =>{
          return <User user={user} key ={'user_'+user.index} showModal={showModal} renderModal={renderModal} />
      })}
    </>
  )
}

const Header = ({handlerInput, handlerSelect, handleReset}) =>{
  return(
    <header>
        <input 
        type="text" 
        placeholder="Enter name..."
        onChange={handlerInput}
        />
        <select name="Age" onChange={handlerSelect}>
            <option  value="default">default</option>
            <option  value="asc">Age asc</option>
            <option  value="desc">Age desc</option>
        </select>
        <button onClick={handleReset}>reset</button>
    </header>
  )
  
}
const renderConfig ={name: "", typeOfSort: "default"}

const App = () =>{
  const [arrayForRender, setArrayForRender] = useState(userData);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalData, setModalData] = useState({});

  const createArrayByConfig = () =>{
    // if((renderConfig.name && renderConfig.age) || (renderConfig.name == "" && renderConfig.age)){
    //   const array = userData.filter(user => {
    //     return (user.name.toLowerCase()).includes(renderConfig.name) && user.age == renderConfig.age
    //   })
      
    //   console.log(renderConfig.name, renderConfig.age)
    //   return array
    // }else 
    
    const array = userData.filter(user => {
      return (user.name.toLowerCase()).includes(renderConfig.name)
    })
    console.log(renderConfig.name, renderConfig.age)
    if(renderConfig.typeOfSort === "asc"){
      return array.sort((a, b)=> a.age-b.age);
    }
    if(renderConfig.typeOfSort === "desc"){
      return array.sort((a, b)=> b.age-a.age);
    }
    return array
  }

  const HandleReset = (e)=>{
    e.target.parentNode.children[0].value =''; 
    e.target.parentNode.children[1].value = "default";
    setArrayForRender(userData)
    renderConfig.name = "";
    renderConfig.typeOfSort = "default";
  }

  const HandlerSelect = (e) =>{
    renderConfig.typeOfSort = e.target.value;
    const array = createArrayByConfig()
    setArrayForRender(array)
  }

  const HandlerInput = (e) =>{
    renderConfig.name = e.target.value.toLowerCase();
    const array = createArrayByConfig()
    setArrayForRender(array)
  }

  const ShowModal = (e)=>{
    setModalIsActive(!modalIsActive);
    
  }

  const RenderModal = (user)=>{
    if(!modalIsActive){
      setModalData(user)
    }
  }


  return(
    <>
      <Header handlerInput={HandlerInput} handlerSelect={HandlerSelect} handleReset={HandleReset}/>
      <main>
          <UsersList arrayForRender={arrayForRender} showModal={ShowModal} renderModal={RenderModal}/>
          <Modal isActive={modalIsActive} showModal={ShowModal} modalData={modalData}/>
      </main>
    </>
  )
}
export default App;

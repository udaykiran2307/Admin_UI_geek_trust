//importing the requried libraries for geek.jsx
import "./Geek.css"
import { AiOutlineDelete } from "react-icons/ai";
import {FiEdit} from "react-icons/fi";
import {useState,useEffect} from "react";
import { TfiCheck} from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";


//<-----------search bar component implementation --------------->
 const SearchBar=({onSearch})=>{
 const [searchQuery, setSearchQuery] = useState(""); // to store value on search bar during onChange
 //function on event of change on the search bar 
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <input
      type = "text"
      placeholder = "search by name,email or role"
      className = "Searchbar"
      value={searchQuery} //conrolled input value 
      onChange={handleInputChange} 
     >
    </input>
  )
}

//entries component implementation
export const Entries = ({ main = false, row, onDelete,  onEdit, 
                         isSelected,onSelect,onSelectAll,isEditMode,
                         handleSave,handleInputChange,editedData,
                         isTileChecked,setIsTileChecked,displayData,selectedDataId })=>{

  

  // the main tile implementation
  if(main)  return (
      <div className="entry">
        <div className="grid-container ">
          <div className="grid-item item1">
            <input 
            className="input-checkbox" 
            type="checkbox"
            checked={selectedDataId.length === displayData.length}  
            onChange={(e) => {
              onSelectAll()
              setIsTileChecked()
            }} 
          />
          </div>
          <div className="grid-item item2">Name</div>
          <div className="grid-item item3">Email</div>
          <div className="grid-item item4">Role</div>
          <div className="grid-item item5">Actions</div>
       </div>
          <hr className ="hr-width"/> 
         </div>
    
      )
  //on clicking o edit button the entry tile implementation
  else if (isEditMode) {
    return (
      <div className="entry">
        //handling the selected tile by className for adding css 
       <div className={`grid-container ${isSelected ? "selected" : ""} `}> 
         <div className="grid-item item1">
            <input 
            className="input-checkbox" 
            type="checkbox"
            checked={isSelected}  
            onChange={() => onSelect(row.id)}  
              />
         </div>
        <div className="grid-item ">
          <input
            type="text"
            value={editedData[row.id].name} 
            onChange={(e) => {handleInputChange(e, row.id, 'name')}}
          />
        </div>
        <div className="grid-item ">
          <input
            type="text"
            value={editedData[row.id].email} 
            onChange={(e) => {handleInputChange(e, row.id, 'email')}}
          />
        </div>
        <div className="grid-item ">
          <input
            type="text"
             value={editedData[row.id].role} 
            onChange={(e) => {handleInputChange(e, row.id, 'role')}}
          />
        </div>
        <div className="grid-item ">
          <button className="save-btn" onClick={() => { handleSave(row.id)}}>
            <TfiCheck />
          </button>
          <button className="undo-btn" onClick={() => { handleSave(row.id)}}>
            <TfiClose />
          </button>
           <button className="delete-btn" onClick={(e) => onDelete(row.id)}>
          <AiOutlineDelete />
        </button>  
        </div>
       </div>

      </div>
    );
  }


  return (
    <div className="entry">
      <div className={`grid-container ${isSelected ? "selected" : ""} `}>
        <div className= "grid-item item1">
        <input 
        className= "input-checkbox" 
        type="checkbox"
        checked={isSelected}  
        onChange={() => onSelect(row.id)} 
          />
        </div>

        <div className="grid-item ">
          {row.name}
        </div>
        <div className="grid-item ">
          {row.email}
        </div>
        <div className="grid-item ">
          {row.role}
        </div>
        <div className="grid-item ">
          <button className="edit-btn" onClick={(e) => onEdit(row.id)}>
            <FiEdit />
          </button>
          <button className="delete-btn" onClick={(e) => onDelete(row.id)}>
            <AiOutlineDelete />
          </button>    
        </div>

    </div>
    <hr className ="hr-width"/>  
</div>
  );
};


export default SearchBar;

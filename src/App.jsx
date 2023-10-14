//importing the required libraries
import './App.css'
import SearchBar from "./Geek.jsx"
import Footer from "./Footer.jsx"
import { Entries } from "./Geek.jsx"
import { useState, useEffect } from "react"

//function  to fetch the data by making API call 
const fetchData = async () => {
  try {
    const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    const data = await fetch(URL);
    const json = await data.json();
    return json;
  }
  catch (e) {
    console.log("error caught",e);
    // console.log(typeof(e));
    // console.log(Object.entries(e));
    return null;
  }
}


// App component implementation
export default function App() {
  const [data, setData] = useState([]);  //data during api call
  const [error, setError]=useState(false); // for error handling
  const [currentPage, setCurrentPage] = useState(1); // to track the current page
  const [selectedDataId, setSelectedDataId] = useState([]); // to track the selected entry tile 
  const[isTileChecked,setIsTileChecked] = useState(false); // to check whether the main tile selected or not 
  const [selectAllChecked, setSelectAllChecked] = useState(false);//to check whether user selected the entire data on page
  const [searchQuery, setSearchQuery] = useState("");//to track search query
  const [filteredData, setFilteredData] = useState([]);//to get filtered Data on searching on search bar
  const [editMode, setEditMode] = useState({}); // to check user clicked the edit button or not
  const[editedData,setEditedData]=useState([]);//to track edited data 


  //on componentDidMount phase calling the  Api Call and fetching data and error handling  
  useEffect(() => {
    async function fetchDataAndSetData() {
      const json = await fetchData();
      if(!json)setError(true);
      else{
         setData(json);
         setFilteredData(json);
       } 
    }
    fetchDataAndSetData();
  }, []);


  //fetching the data on search  and storing in  the filtered Data  by checking on the,name,email,role
  useEffect(() => {
    setFilteredData(data);
    const filtered = data.filter(
      (entry) =>
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);

  }, [data,searchQuery]);


  const handleSearchQuery = (e) =>{
      setCurrentPage(1);
      setSearchQuery(e);
  }


  //logic to implement the number of entries to display on the page
  const entriesPerPage = 10; // number of entries 
  const endIndex = currentPage*entriesPerPage; //last index on current page 
  const startIndex = endIndex - entriesPerPage; // start index on current page 

  const displayData = filteredData.slice(startIndex, endIndex); //data to be displayed on the current page
  const lastPage = Math.ceil(filteredData.length / entriesPerPage); // last page number 



  // <---Entry tile functionalitiy implementation --->
  //setting the curpage on click operation 
  const handlePageDisplay = (newPage) => {
    setSelectAllChecked([]);
    setCurrentPage(newPage);
  }
 //delete the entries on clicking the delete operation
  const handleDeleteEntry = (entryId) => {
     const updatedData = data.filter((entry) => entry.id !== entryId);
     setData(updatedData);
     setSelectedDataId(selectedDataId.filter((id) => id !== entryId));

     if ((data.length) % 10 === 1 && entryId === data[data.length - 1].id) {
       handlePageDisplay(currentPage - 1);
     }
   };

  //editing on the click of edit button
  const handleEditEntry = (entryId) => {
        setEditMode({ ...editMode, [entryId]: true });
        setEditedData((prevEditedData) => ({
          ...prevEditedData,
          [entryId]: { ...data.find((entry) => entry.id === entryId) },
        }));
     };

  //save button implementation 
  const handleSave = (entryId) => {
      // console.log("clicked ");
      const updatedData = data.map((entry) =>
        entry.id === entryId ? editedData[entryId] : entry
      );
      setData(updatedData);
      setEditMode({ ...editMode, [entryId]: false });
  };

  // User Input functionalitiy implementation
    const handleInputChange = (e, entryId, field) => {
      const newValue = e.target.value;
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [entryId]: { ...prevEditedData[entryId], [field]: newValue },
      }));
    };
  //<-------------------------------------------->//



  //<---------------  Footer Functionality Implementation ------------------>//

  //handling on selecting all the entries on the page
  const handleSelectAll = () => {
    if (selectedDataId.length === displayData.length) {
      setSelectedDataId([]);
      setSelectAllChecked([]);
    } else {
      const allEntryIds = displayData.map((entry) => entry.id);
      setSelectAllChecked(allEntryIds);
      setSelectedDataId(allEntryIds);
    }
  };


  //handling the deleteSelected buttton click 
  const handleDeleteSelectedEntries = () => {
    const updatedData = data.filter((entry) => !selectedDataId.includes(entry.id));

    setData(updatedData);
    setSelectedDataId([]);
    setSelectAllChecked(false);
    if(isTileChecked){
      setIsTileChecked(false)
      if(currentPage === lastPage && displayData.length==0){
        setCurrentPage(currentPage-1);
      }
    }   
  }

  //<------------------------------------------------------------->//

  //Error-handling functionalitiy implementation
  if(error){
    return (
      <main>
        
        <Entries 
          main={true}
          onSelectAll={handleSelectAll}
          selectDataId ={selectDataId}
          displayData ={displayData}
          isTileChecked={isTileChecked}
          setIsTileChecked={setIsTileChecked}
          />
       <div className ="error-handling"> unable to fetch the info,Please check the API or ensure backend is working </div>
      </main>
    )
  }

  return (
    <main>
       
      <SearchBar onSearch={handleSearchQuery} />
     
          <Entries 
            main={true}
            onSelectAll={handleSelectAll}
            selectedDataId = {selectedDataId}
            displayData ={displayData}
            isTileChecked={isTileChecked}
            setIsTileChecked={setIsTileChecked}
            />
       
      
        
      
      {displayData.map((entry) => (
      <Entries
        key={entry.id}
        row={entry}//entry data on current page  
        onDelete={() => handleDeleteEntry(entry.id)}
        onEdit={() => handleEditEntry(entry.id)} 
        isSelected={selectedDataId.includes(entry.id)} // selectedDataId stores Id of the click 
        onSelect={(entryId) => {
            setSelectedDataId((prevSelected) => { //select and deselect implementation 
              if (prevSelected.includes(entryId)) {
                return prevSelected.filter((id) => id !== entryId);
              } else {
                return [...prevSelected, entryId];
              }
            });
          }}

        isEditMode={editMode[entry.id]} // editMode stores the id of the entry that is clicked to edit 
         handleSave={() => handleSave(entry.id)}  
        handleInputChange = { handleInputChange} 
        editedData = {editedData}
      />
      ))}
     
 
      <Footer
        curPage={currentPage}
        lastpage={lastPage}
        filteredData={filteredData}
        handlePagenation={handlePageDisplay}
        deleteSelected={handleDeleteSelectedEntries}  
      />

  </main>
  )
}

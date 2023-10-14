import {useState,useEffect} from "react"
import "./Footer.css"
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";


//footer component
 const Footer = ({ curPage, handlePagenation, lastpage, filteredData, deleteSelected }) => {
  const entriesPerPage = 10;
  
  const [activeButton, setActiveButton] = useState(1);//current active 

  const [numberofButtons, setNumberofButtons] = useState(Math.ceil(filteredData.length / entriesPerPage));//number of buttons

  useEffect(() => {
    setNumberofButtons(Math.ceil(filteredData.length / entriesPerPage));
  }, [filteredData]);

  const buttonNumberArray = Array.from({ length: numberofButtons }, (_, index) => index + 1);

  const handlePageChange = (newPage) => {
    setActiveButton(newPage);
    handlePagenation(newPage);
  }

  return (
    <div className="footer">
      <button
        className="deleteSelected"
        onClick={deleteSelected}
      >
        Delete Selected
      </button>
      <div className="buttons">
        <button
          className={`circle ${activeButton === 1 || curPage === 1 ? 'reach-end' : ''}`}//reached end or not 
          onClick={() => { if (activeButton > 1) handlePageChange(1) }}
        >
          <AiOutlineDoubleLeft />
        </button>
        <button
          className={`circle ${activeButton === 1 || curPage === 1 ? 'reach-end' : ''}`}
          onClick={() => { if (activeButton > 1) handlePageChange(activeButton - 1) }}//reached end or not 
        >
          <AiOutlineLeft />
        </button>
        {
          buttonNumberArray.map((buttonNum, i) => (
            <button
              className={`circle ${buttonNum === curPage ? 'active' : ''}`}
              onClick={() => handlePageChange(buttonNum)}
              key={buttonNum}
            >
              {buttonNum}
            </button>
          ))
        }

        <button
          className={`circle ${(activeButton === numberofButtons || curPage === lastpage) ? 'reach-end' : ''}`}
          onClick={() => { if (activeButton < numberofButtons) handlePageChange(activeButton + 1) }}
        >
          <AiOutlineRight />
        </button>

        <button
          className={`circle ${(activeButton === numberofButtons || curPage === lastpage )? 'reach-end' : ''}`}
          onClick={() => { if (activeButton < numberofButtons) handlePageChange(numberofButtons) }}
        >
          <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  );
};


 export default Footer;
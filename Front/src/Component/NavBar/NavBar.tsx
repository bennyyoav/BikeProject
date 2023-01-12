import { useNavigate, useNavigation } from "react-router-dom"
import "./NavBar.css"


export  function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="NavBar">

        <img  className="bikeIcon"  src="https://th.bing.com/th/id/OIP.QeH31QoeQuQw_lwzD-adyQHaFu?pid=ImgDet&rs=1" alt="" />
        <div className="navigates">
            <div  onClick={() => { navigate('/') }}>Home</div>
            <div  onClick={() => { navigate('/BikeCompetitions') }}>Bike competitions</div>
            <div  onClick={() => { navigate('/SiteRegistration') }}>Site Registration </div>
            <div onClick={() => { navigate('/AboutAs') }}>About As</div>
        </div>
  
        
        
    </div>
  )
}

import "./Header.css"
import cheflogo from "../../assets/images/ChefIcon.png"

export default function Header(){
    
    return(
        <header>
        <div className="header-content">
        <img src={cheflogo} alt = "logo" />
        <span>Chef claude</span>
        </div>
        
        </header>
    )
}
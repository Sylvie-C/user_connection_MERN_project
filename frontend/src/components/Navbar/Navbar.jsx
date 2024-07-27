import { useSelector } from "react-redux" ; 

import { getAuth } from "../../selectors" ; 
import NavbarBtn from "./NavbarBtn" ; 

export default function Navbar () {
  let display; 
  const isAuth = useSelector(getAuth) ; 

  if (isAuth) { display = true; }
  else{ display = false; }

  return(
    <>
      <nav className="w-full lg:max-w-5xl mx-auto flex justify-between items-center">
        <NavbarBtn btnTxt="Back Home" destination="/" />
        <div>    
          { display && 
            <NavbarBtn btnTxt="Settings" destination="/protected/settings" /> 
          }
        </div>
      </nav>
    </>
  )
}
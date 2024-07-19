
import NavbarBtn from "./NavbarBtn" ; 

export default function Navbar () {

  // -------  TO BE IMPLEMENTED V02 : Settings button displayed if user connected (token)
  let display ; 
  let token ; 

  token = false; // SHOW / HIDE SETTINGS BTN 

  if (token) { display = "inline-block" } 
  else { display = "hidden" }
  // --------------------------------------------------------------


  return(
    <>
      <nav className="w-full lg:max-w-5xl mx-auto flex justify-between items-center">
          <NavbarBtn btnTxt="Back Home" destination="/" />
        <div className={ display }>
          <NavbarBtn btnTxt="Settings" destination="/protected/settings" />
        </div>
      </nav>
    </>
  )
}
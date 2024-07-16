
import NavbarBtn from "./NavbarBtn" ; 

export default function Navbar () {

  // -------  TO BE IMPLEMENTED : "Settings" button display (Redux Store ?)
  let display ; 
  let token ; 

  token = true; // SHOW / HIDE SETTINGS BTN 

  if (token) { display = "inline-block" } // If token (user connected), display
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
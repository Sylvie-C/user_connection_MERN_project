import { NavLink } from "react-router-dom" ; 

export default function NavbarBtn ( { btnTxt , destination="" } ) {

  return (
    <>
      <NavLink 
        to={ destination } 
        className="m-2 p-2 rounded-full bg-teal-950 text-teal-300 transition hover:bg-teal-300 hover:text-teal-950"
      >
        { btnTxt }
      </NavLink>
    </>
  )
}

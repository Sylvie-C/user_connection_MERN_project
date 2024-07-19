import { useState } from "react" ; 

export default function EyeIcon ( { eyeClicked } ) {

  const [ eyeOpened , setOpen ] = useState (true) ; 

  let eyeIcon

  if (eyeOpened) {
    eyeIcon = String.fromCodePoint(128065) ; 
  }else{
    eyeIcon = '\u25E1' ; 
  }

  const openEye = () => { 
    setOpen (!eyeOpened) ; 
    eyeClicked(eyeOpened); 
  }

  return (
    <div>
      <span onClick={ openEye } className="mx-2 hover:cursor-pointer">
        { eyeIcon } 
      </span>
    </div>
  )
}
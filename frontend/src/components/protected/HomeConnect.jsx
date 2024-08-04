import { useSelector } from "react-redux" ; 
import { getAuth , getUsername } from '../../selectors';

export default function HomeConnect () {
  const username = useSelector(getUsername) ; 
  const isAuth = useSelector(getAuth) ; 

  console.log ("isAuth from <HomeConnect/> : " , isAuth); 
  
  return (
    isAuth && 
    <main className="w-full sm:max-w-xl mx-auto bg-purple-400 rounded-md flex justify-center ">
    <div className="w-full lg:w-2/4 mx-2 py-6 ls:mx-16 my-8 lg:my-16 bg-purple-200 rounded-md text-center">
      <p className="text-3xl">Welcome back <br/>{ username } !</p>
    </div>
  </main>
  )
}
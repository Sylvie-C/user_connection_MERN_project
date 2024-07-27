import { NavLink } from "react-router-dom"; 

export default function NotFound () {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-3xl lg:text-5xl lg:leading-relaxed text-cyan-950 text-center lg: my-24">Error 404 <br/>
        Oups ! Nothing here ! 
      </p>
    </main>
  )
}
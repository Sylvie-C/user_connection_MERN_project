
export default function Message ( {text} ) {
  return (
    <main className="h-screen">
      <p className="h-4/5 flex justify-center items-center text-3xl lg:text-5xl lg:leading-relaxed text-cyan-950 text-center">
        { text }
      </p>
    </main>
  )
}
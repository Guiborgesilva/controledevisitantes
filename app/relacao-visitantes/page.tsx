export default async function Page() {
  const fetchVisitante = await fetch('/api/visitante',{
    method: 'GET'
  })
  return (
    <section
      className="
        flex
        justify-center
        items-center
        w-full
        h-screen
      "
    >
      <main
        className="
          text-white
        "
      >
        <h1>Relação dos visitantes</h1>
      </main>
    </section>
  )
}
import { fetchFilteredVisitantes } from "@/app/lib/actions"
import { nomeSobrenome } from "@/app/lib/utils"
import DotsDropdown from "@/app/ui/components/DotsDropdown"

export default async function Table({
  query,
  currentPage
} : {
  query: string,
  currentPage: number
}) {
  const visitantes = await fetchFilteredVisitantes(query, currentPage)
  return (
    <>
      {
        visitantes?.length > 0 ?
        visitantes.map((visitante) => (
          <div
            className="
              w-full
              h-[77.5px]
              p-2
              rounded-lg
              transition
              border
              border-white
              flex
              flex-col
              gap-2
              items-center
            "
            key={visitante.id}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-start p-2">
                <div className="
                  rounded-full
                  size-10
                  bw
                  grid
                  place-items-center
                  bg-white
                  "
                >
                  <h2
                    className="
                      text-2xl
                      text-black
                      font-bold
                      cursor-default
                    "
                  >
                    {visitante.nome.substring(0,1)}
                  </h2>
                </div>
                <div className="ml-3 cursor-default">
                  <div className="flex justify-start flex-col">
                    <p className="justify-start">
                      {nomeSobrenome(`${visitante.nome}`)}
                    </p>
                    <p className="text-[13px] justify-end">{visitante.bairro}</p>
                  </div>
                </div>
              </div>
              <DotsDropdown
                id={visitante.id}
                nome={visitante.nome}
                telefone={visitante.telefone}
              />
            </div>
          </div>
        )) : (
          <div className="w-full grid place-items-center col-span-2">
            <p>Nenhum visitante cadastrado!</p>
          </div>
        )
      }
    </>
  )
}
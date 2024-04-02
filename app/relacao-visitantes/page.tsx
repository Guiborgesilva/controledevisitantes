import { fetchVisitantesPages } from "@/app/lib/actions"
import { Suspense } from "react"
import Table from "@/app/ui/components/Table"
import Pagination from "@/app/ui/components/Pagination"
import Search from "@/app/ui/components/Search"
import Link from "next/link"
import { CardsSkeleton } from "@/app/ui/components/Skeletons"

export default async function Page({
  searchParams,
} : {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchVisitantesPages(query);

  return (
    <section
      className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        h-full
        md:h-screen
      "
    >
      <div
        className="
          w-full
          flex
          justify-center
          items-center
          animate-up
        "
      >
        <h1
          className="
            text-4xl
            text-white
            my-8
          "
        >VISITANTES</h1>
      </div>
      <main
        className="
          text-white
          mx-[2%]
          px-8
          py-10
          mb-9
          w-[370px]
          md:w-[700px]
          flex
          flex-col
          gap-6
          bg-slate-800
          rounded-lg
          animate-up
        "
      >
        <div className="flex justify-between md:justify-normal md:gap-10 items-center mb-8">
          <Link href={{ pathname:'/' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          </Link>
          <Search placeholder="Quem você procura?" />
        </div>
        <div
            className="
              flex
              flex-col
              md:grid
              md:grid-cols-2
              gap-2
            "
          >
            <Suspense key={query + currentPage} fallback={<CardsSkeleton />}>
              <Table query={query} currentPage={currentPage} />
            </Suspense>
          </div>
        <div className="mt-5 flex w-full justify-center cursor-default">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    </section>
  )
}
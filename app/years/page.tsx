"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const router = useSearchParams();
  const year = router.get("year3");
  const years: number[] = [];
  for (let i = 2024; i < 2043; i++) {
    years.push(i);
  }
  return (
    <div className="min-h-[100svh] bg-slate-200 grid grid-rows-10">
      <div className="row-span-2">
      </div>
      <div className="row-span-6 grid grid-cols-5 gap-2 mx-2">
        {years.map((year) => {
          return <Link href={`/months?year=${year}&month=1`} className="text-center my-auto bg-white border border-gray-300 shadow-lg py-4 rounded-lg">{year}</Link>
        })}
      </div>
      <div className="row-span-2">
      </div>
    </div>
  )
}
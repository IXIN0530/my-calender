"use client"
import { useSearchParams } from "next/navigation";
export default function Home() {
  const router = useSearchParams();
  const year = router.get("year3");
  return (
    <div className="min-h-[100svh] bg-slate-200 flex flex-col justify-center">
      <div className="grid grid-cols-5">
        <p>2024</p>
        <p>2025</p>
        <p>2026</p>
        <p>2027</p>
        <p>2028</p>
        <p>2029</p>

      </div>
    </div>
  )
}
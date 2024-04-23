"use client"
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { allDataType, planType } from "../type";
import functions from "../functions/functions";
import Month from "../components/month";
import { useRouter } from "next/navigation";
import { easeInOut, easeOut, motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/footer/footer";
import AddPlanModal from "../components/footer/addPlanModal";

export default function Home() {

  const realRouter = useRouter();
  const router = useSearchParams();
  // const year: number = router.get("year") ? Number(router.get("year")) : -1;
  // const month: number = router.get("month") ? Number(router.get("month")) : -1;
  //ページ遷移関連
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(1);

  const Search = () => {
    const _year: number = router.get("year") ? Number(router.get("year")) : -1;
    const _month: number = router.get("month") ? Number(router.get("month")) : -1;
    setMonth(_month);
    setYear(_year);
    return <></>
  }

  //footer関連（特に予定追加モーダルボタン）
  const [isAddPlanClicked, setIsAddPlanClicked] = useState<boolean>(false);

  const [isDayClicked, setIsDayClicked] = useState<boolean>(false);
  const { makeDayData, getWeeksInMonth } = functions();
  const [mouseX, setMouseX] = useState(0);
  //現在のdayDataをstateで管理
  const [dayData, setDayData] = useState<allDataType[]>(makeDayData());

  //予定追加
  //何の予定を追加するか
  const [whatToSet, setWhatToSet] = useState<planType>({ beginTime: [0, 0], endTime: [0, 0], title: "" });
  //追加する予定が選択されているか
  const [isPlanSelected, setIsPlanSelected] = useState<boolean>(false);

  //カレンダーの月の切り替え
  const mouseDown = (e: any) => {
    setMouseX(e.changedTouches[0].pageX);
  }
  const mouseEnd = (e: any) => {
    //dayモーダルが開かれている時にはカレンダーの切り替えを行わない
    if (!isDayClicked && !isAddPlanClicked) {
      if (e.changedTouches[0].pageX - mouseX > 0) {
        setIsLoading(!isLoading);
        if (month - 1 === 0 && year != 2024) realRouter.push("/months?year=" + (year - 1) + "&month=" + 12);
        else if (month != 1) realRouter.push("/months?year=" + (year) + "&month=" + (month - 1));
      }
      else if (e.changedTouches[0].pageX - mouseX < 0) {
        setIsLoading(!isLoading);
        if (month + 1 === 13 && year != 2042) {
          realRouter.push("/months?year=" + (year + 1) + "&month=" + 1);
        }
        else if (month != 12) realRouter.push("/months?year=" + (year) + "&month=" + (month + 1));
      }
      console.log(isLoading);
    }
  }
  console.log(dayData);
  return (
    <div>
      <Suspense>
        <Search />
      </Suspense>
      <motion.div className="grid grid-rows-10 min-h-[100svh] "
        onTouchStart={mouseDown}
        onTouchEnd={mouseEnd}
        animate={isLoading ? { opacity: [1, 0.5, 1], scale: [1, 0.9, 1] } : { opacity: [2, 0.5, 1], scale: [1, 0.91, 1] }}
        transition={{ duration: 0.3, ease: easeInOut }}
        style={{ scale: isAddPlanClicked ? "20%" : "100%" }}>

        <div className="row-span-1 bg-slate-100 grid grid-cols-3">
          <div className="flex justify-center">
            <Link href={"/years"} className="text-xl bg-white shadow-md border border-gray-300 my-auto p-2 rounded-xl">{year}</Link>
          </div>
          <p className="my-auto text-3xl text-center">{month}月</p>
        </div>
        <div className="row-span-8 relative">
          <Month
            monthData={dayData[year - 2024].months[month - 1]}
            isDayClicked={isDayClicked}
            setIsDayClicked={setIsDayClicked}
            year={year} />
        </div>
        <Footer
          isAddPlanClicked={isAddPlanClicked}
          setIsAddPlanClicked={setIsAddPlanClicked} />
      </motion.div>
      {isAddPlanClicked &&
        <AddPlanModal
          isAddPlanClicked={isAddPlanClicked}
          setIsAddPlanClicked={setIsAddPlanClicked}
          isPlanSelected={isPlanSelected}
          setIsPlanSelected={setIsPlanSelected}
          whatToSet={whatToSet}
          setWhatToSet={setWhatToSet}
        />}
    </div>
  )
}
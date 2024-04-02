"use client"
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { allDataType } from "../type";
import functions from "../functions/functions";
import Month from "../components/month";
import { useRouter } from "next/navigation";
import { easeInOut, easeOut, motion } from "framer-motion";
export default function Home() {
  const router = useSearchParams();
  const realRouter = useRouter();
  //ページ遷移関連
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const year: number = router.get("year") ? Number(router.get("year")) : -1;
  const month: number = router.get("month") ? Number(router.get("month")) : -1;
  const didMount = useRef(false);
  const [isDayClicked, setIsDayClicked] = useState<boolean>(false);
  const { makeDayData, getWeeksInMonth } = functions();
  const [test, setTest] = useState(0);
  //現在のdayDataをstateで管理
  const [dayData, setDayData] = useState<allDataType[]>(makeDayData());

  //カレンダーの月の切り替え
  const mouseDown = (e: any) => {
    setTest(e.changedTouches[0].pageX);
  }
  const mouseEnd = (e: any) => {
    //dayモーダルが開かれている時にはカレンダーの切り替えを行わない
    if (!isDayClicked) {
      if (e.changedTouches[0].pageX - test > 0) {
        setIsLoading(!isLoading);
        if (month - 1 === 0 && year != 2024) realRouter.push("/months?year=" + (year - 1) + "&month=" + 12);
        else if (month != 1) realRouter.push("/months?year=" + (year) + "&month=" + (month - 1));
      }
      else if (e.changedTouches[0].pageX - test < 0) {
        setIsLoading(!isLoading);
        if (month + 1 === 13 && year != 2042) {
          realRouter.push("/months?year=" + (year + 1) + "&month=" + 1);
        }
        else if (month != 12) realRouter.push("/months?year=" + (year) + "&month=" + (month + 1));
      }
      console.log(isLoading);
    }
  }


  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //     const jsonDayData = localStorage.getItem("dayData");
  //     if (jsonDayData) {
  //       const tempdayData: allDataType[] = JSON.parse(jsonDayData);
  //       setDayData(tempdayData);
  //       console.log("month画面の方でロードが完了しました");
  //       console.log(tempdayData);
  //     }
  //   }
  //   else {
  //     localStorage.setItem("dayData", JSON.stringify(dayData));
  //     console.log("month画面の方でセーブしました");
  //   }
  // }, [dayData])
  console.log(dayData);
  return (
    <motion.div className="grid grid-rows-12 min-h-[100svh] "
      onTouchStart={mouseDown}
      onTouchEnd={mouseEnd}
      animate={isLoading ? { opacity: [1, 0.5, 1], scale: [1, 0.9, 1] } : { opacity: [2, 0.5, 1], scale: [1, 0.91, 1] }}
      transition={{ duration: 0.3, ease: easeInOut }}>
      <div className="row-span-1 bg-slate-100 grid grid-cols-3">
        <div className=" relative">
          <p className=" absolute bottom-0 text-xl">{year}</p>
        </div>
        <p className="my-auto text-3xl text-center">{month}月</p>
      </div>
      <div className="row-span-10 max-h-[84svh]">
        <Month
          monthData={dayData[year - 2024].months[month - 1]}
          isDayClicked={isDayClicked}
          setIsDayClicked={setIsDayClicked}
          year={year} />
      </div>
      <div className="row-span-1 bg-sky-100"></div>
    </motion.div>
  )
}
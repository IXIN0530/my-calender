"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import MiniDay from "./miniDay"
import { planType } from "../type"
type DayProps = {
  day: {
    date: number,
    day: number,
    plans: planType[],
  },
  month: number,
  year: number,
}


const Day = ({ day, month, year }: DayProps) => {
  const [scale, setScale] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const onClick = (e: any) => {
    if (!isClicked) setIsClicked(true);
    else setIsClicked(false);
  }
  //伝搬を防ぐための関数
  const stopPropagation = (e: any) => {
    if (isClicked) e.stopPropagation();
  }
  useEffect(() => {
    const h = window.innerHeight;
    const w_0 = document.getElementById("day")?.clientWidth ?? 0;
    const w = window.innerWidth;
    setScale(w / w_0);
    // if (isDayClicked) {
    //   console.log("dayがクリックされています");
    // }
    // else {
    //   console.log("dayがクリックされていません");

    // }
  })
  return (
    <motion.div
      id="day"
      onClick={onClick}
      onTouchStart={stopPropagation}
      onTouchEnd={stopPropagation}
      className={!isClicked ? "relative" : "text-center shadow-md rounded-lg fixed top-0 left-0 w-full h-full bg-slate-200 z-50"}
      // animate={isDayClicked ? { width: w, height: h } : {}}
      // style={{ originX: 0.5, originY: 0.5, scale }}
      transition={{ duration: 0.5 }}
    >
      {!isClicked ?
        <MiniDay
          day={day}
          month={month}
          year={year}
        />
        // <p className="shadow-xl absolute top-0 bottom-0 left-0 right-0">xsj</p>
        :
        <div>
        </div>
      }
    </motion.div>
  )
}

export default Day;
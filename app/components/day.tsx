"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import MiniDay from "./miniDay"
import { allDataType, planType } from "../type"
type DayProps = {
  day: {
    date: number,
    day: number,
    plans: planType[],
  },
  month: number,
  year: number,
  isPlanSelected: boolean,
  dayData: allDataType[],
  setDayData: (dayData: allDataType[]) => void,
  whatToSet: planType,
}


const Day = ({ day, month, year, isPlanSelected, dayData, setDayData, whatToSet }: DayProps) => {
  const [scale, setScale] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  //予定を追加する時にこの日が選択されているかを管理するstate
  const [isAddPlanClicked, setIsAddPlanClicked] = useState(false);
  const onClick = (e: any) => {
    //予定追加モードの時
    if (isPlanSelected) {
      setIsAddPlanClicked(!isAddPlanClicked);
    }
    else {
      setIsClicked(!isClicked);
    }
  }
  //伝搬を防ぐための関数
  const stopPropagation = (e: any) => {
    if (isClicked) e.stopPropagation();
  }
  useEffect(() => {
    //予定を追加する時
    if (isAddPlanClicked) {
      const _dayData = [...dayData];
      _dayData[year - 2024].months[month - 1].days[day.date - 1].plans.push(whatToSet);
      setDayData(_dayData);
    }
    setIsAddPlanClicked(false);
  }, [isPlanSelected])

  return (
    <motion.div
      id="day"
      onClick={onClick}
      onTouchStart={stopPropagation}
      onTouchEnd={stopPropagation}
      className={!isClicked ? "relative bg-slate-200" : "text-center shadow-md rounded-lg fixed top-0 left-0 w-full h-full bg-slate-200 z-50"}
      transition={{ duration: 0.5 }
      }
      style={{ filter: (isPlanSelected && !isAddPlanClicked) ? "brightness(0.7)" : "" }}
    >
      {!isClicked ?
        <MiniDay
          day={day}
          month={month}
          year={year}
          isPlanSelected={isPlanSelected}
        />
        :
        <div>
        </div>
      }
    </motion.div>
  )
}

export default Day;
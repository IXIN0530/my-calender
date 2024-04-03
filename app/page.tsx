"use client"
import { useEffect, useRef, useState } from "react";
import Month from "./components/month";
import functions from "./functions/functions";
import { motion } from "framer-motion";
import Link from "next/link";
import { allDataType } from "./type";
import { useRouter } from "next/navigation";
export default function Home() {
  const { makeDayData } = functions();
  const didMount = useRef(false);
  const date = new Date();
  //現在開いている年月日をstateで管理
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());
  //dayDataをstateで管理
  const [dayData, setDayData] = useState(makeDayData());
  const today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  }

  const router = useRouter();

  console.log(dayData);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const jsonDayData = localStorage.getItem("dayData");
      if (jsonDayData) {
        const tempdayData: allDataType[] = JSON.parse(jsonDayData);
        console.log("loaded");
        setDayData(tempdayData);
      }
    }
    else {
      localStorage.setItem("dayData", JSON.stringify(dayData));
      console.log("saved");
    }
    router.push("/months?year=" + year + "&month=" + month);
  }, [dayData])
  return (
    <div className="grid grid-rows-12 min-h-[100svh]">
      {/* <div className="row-span-1 bg-slate-100 grid grid-cols-3">
        <div className=" relative">
          <p className=" absolute bottom-0 text-xl">{year}</p>
        </div>
        <p className="my-auto text-3xl text-center">{month}月</p>
      </div>
      <div className="row-span-11">
        {<Month
          monthData={dayData[year - 2024].months[month - 1]}
          isDayClicked={false}
          setIsDayClicked={() => (false)} />}
      </div> */}
    </div>
  );
}

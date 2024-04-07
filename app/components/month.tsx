import functions from "../functions/functions";
import { monthDataType } from "../type";
import Day from "./day";
import { motion } from "framer-motion";
type Props = {
  monthData: monthDataType
  isDayClicked: boolean,
  setIsDayClicked: (isDayClicked: boolean) => void,
  year: number,
}
const day = ["日", "月", "火", "水", "木", "金", "土"];
const Month = ({ monthData, isDayClicked, setIsDayClicked, year }: Props) => {
  const temp = [];
  for (let i = 0; i < monthData.days[0].day; i++) {
    temp.push(1);
  }
  const { getWeeksInMonth } = functions();
  const weeks = getWeeksInMonth(year, monthData.month);
  return (
    <div className=" absolute top-0 bottom-0 left-0 right-0 grid grid-rows-12">
      <div className="grid grid-cols-7 row-span-1 bg-white my-auto">
        {day.map((day) => { return <p className="text-center font-bold">{day}</p> })}
      </div>
      <div className="grid grid-cols-7  bg-slate-200 row-span-11" style={{ display: "grid", gridTemplateRows: `repeat(${weeks}, minmax(0, 1fr))` }}>
        {temp.map((_, index) => { return <p className="text-center bg-slate-200"></p> })}
        {monthData.days.map((day, index) => {
          return <Day
            day={day}
            month={monthData.month}
            year={year}
          />
        })}
      </div>
    </div>
  )
}

export default Month;
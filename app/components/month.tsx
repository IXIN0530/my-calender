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
  return (
    <div className="">
      <div className="grid grid-cols-7">
        {day.map((day) => { return <p className="text-center">{day}</p> })}
      </div>
      <div className="grid grid-cols-7  bg-slate-200">
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
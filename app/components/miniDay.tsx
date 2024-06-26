import { planType } from "../type";
type DayProps = {
  day: {
    date: number,
    day: number,
    plans: planType[],
  },
  month: number,
  year: number,
  isPlanSelected: boolean,
}
//連続している予定をバーで繋げて表示するための考え方
//連続している予定を見つけるために、予定を開始日順にソートする
//上から順番にそれを出力していく
const MiniDay = ({ day, month, year, isPlanSelected }: DayProps) => {

  return (
    <div className={` absolute top-0 bottom-0 left-0 right-0 text-center rounded-lg  grid grid-rows-6 shadow-md `}
    >
      {day.date}
      <div></div>
      {day.plans.map((plan, index) => {
        if (index >= 4) return null;
        return <p className="bg-sky-300 rounded-md text-xs">{plan.title.slice(0, 4)}</p>
      })}
    </div>
  )
}

export default MiniDay;
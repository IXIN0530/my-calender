"use client"
import { stringify } from "querystring";
import functions from "../functions/functions";
import { planType } from "../type";
import { useState } from "react";
type DayProps = {
  day: {
    date: number,
    day: number,
    plans: planType[],
  },
  month: number,
  year: number,
}
//連続している予定をバーで繋げて表示するための考え方
//連続している予定を見つけるために、予定を開始日順にソートする
//上から順番にそれを出力していく
const MiniDay = ({ day, month, year }: DayProps) => {

  const { getWeeksInMonth } = functions();
  const weeks = getWeeksInMonth(year, month);
  const className = `text-center rounded-lg  grid grid-rows-7 shadow-md `;
  return (
    <div className={className} style={{ height: (250 / (3 * weeks)) + "svh" }}>
      {day.date}
      <div></div>
      <p className="bg-red-300 ">hello</p>
      {day.plans.map((plan) => {
        return <p>{plan.title}</p>
      })}
    </div>
  )
}

export default MiniDay;
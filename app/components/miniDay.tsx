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
  isPlanSelected: boolean,
}
//連続している予定をバーで繋げて表示するための考え方
//連続している予定を見つけるために、予定を開始日順にソートする
//上から順番にそれを出力していく
const MiniDay = ({ day, month, year, isPlanSelected }: DayProps) => {

  return (
    <div className={` absolute top-0 bottom-0 left-0 right-0 text-center rounded-lg  grid grid-rows-6 shadow-md `}
      id={day.day.toString()}>
      {day.date}
      <div></div>
      <p className="bg-red-300 text-xs ">hello</p>
      {day.plans.map((plan) => {
        return <p className="bg-red-300 text-xs">{plan.title}</p>
      })}
    </div>
  )
}

export default MiniDay;
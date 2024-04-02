export type monthDataType = {
  month: number,
  days: {
    date: number,
    day: number,
    plans: planType[],
  }[],
}

export type allDataType = {
  year: number,
  months: monthDataType[],
}

export type planType = {
  beginDate: [number, number, number],
  endDate: [number, number, number],
  beginTime: [number, number],
  endTime: [number, number],
  title: string,
}
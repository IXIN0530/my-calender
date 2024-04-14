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
  beginTime: [number, number],
  endTime: [number, number],
  title: string,
}

//予定を加えるときその重要度を表すものも追加
export type planMenuProps = {
  planDetail: planType,
  isImportant: boolean,
}
// type allDataType={
//   year: number,
//   months:[
//     {
//       month: number,
//       days:[
//         {
//           date: number,
//           day: number,
//           plans: string[],
//         }
//       ]
//     }

//   ]
// }
import { allDataType, monthDataType, planType } from "../type";
const functions = () => {
  const makeDayData = () => {
    const dayData: allDataType[] = [
      {
        year: 2024, months: [{
          month: 1,
          days: [
            {
              date: 1,
              day: 0,
              plans: [],
            },
          ]
        }]
      },
    ];


    for (let i = 1; i < 20; i++) {
      dayData.push({ year: 2023 + i, months: [] });
      for (let j = 0; j < 12; j++) {
        dayData[i].months.push({ month: j + 1, days: [] });
        for (let k = 0; k < 31; k++) {
          //閏年
          const dmeoPlan: planType = {
            beginTime: [0, 0],
            endTime: [2, 0],
            title: "hello",
          }
          if (dayData[i].year % 4 == 0) {
            if (dayData[i].months[j].month == 2 && k == 29) {
              break;
            }
            else if (dayData[i].months[j].month == 4 || dayData[i].months[j].month == 6 || dayData[i].months[j].month == 9 || dayData[i].months[j].month == 11) {
              if (k == 30) {
                break;
              }
            }
            dayData[i].months[j].days.push({ date: k + 1, day: 0, plans: [] });
          }
          //閏年でない
          else {
            if (dayData[i].months[j].month == 2 && k == 28) {
              break;
            }
            else if (dayData[i].months[j].month == 4 || dayData[i].months[j].month == 6 || dayData[i].months[j].month == 9 || dayData[i].months[j].month == 11) {
              if (k == 30) {
                break;
              }
            }
            dayData[i].months[j].days.push({ date: k + 1, day: 0, plans: [] });
          }
        }
      }
    }
    dayData.shift();
    dayData.forEach((year, index) => {
      year.months.forEach((month, index) => {
        month.days.forEach((day, index) => {
          day.day = new Date(year.year, month.month - 1, day.date).getDay();
        })
      })
    })
    return dayData;
  }

  const getWeeksInMonth = (year: number, month: number) => {
    // 月の最初の日を取得
    var firstDay = new Date(year, month - 1, 1);
    // 月の最後の日を取得
    var lastDay = new Date(year, month, 0);
    // 月の日数を計算
    var daysInMonth = lastDay.getDate();
    let ans: number = 1;
    for (let i = 1; i < daysInMonth; i++) {
      if (new Date(year, month - 1, i + 1).getDay() == 0) {
        ans++;
      }
    }

    return ans;
  }

  return {
    makeDayData,
    getWeeksInMonth,
  }
}

export default functions;
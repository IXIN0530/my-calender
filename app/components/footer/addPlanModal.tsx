"use client"
import { planType } from "@/app/type";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react"
import PlanList from "./planList";
type Props = {
  isAddPlanClicked: boolean,
  setIsAddPlanClicked: (isAddPlanClicked: boolean) => void,
  isPlanSelected: boolean,
  setIsPlanSelected: (isPlanSelected: boolean) => void,
  whatToSet: planType,
  setWhatToSet: (whatToSet: planType) => void,
}

type planMenuProps = {
  planDetail: planType,
  isImportant: boolean,
}
const AddPlanModal = ({
  isAddPlanClicked,
  setIsAddPlanClicked,
  isPlanSelected,
  setIsPlanSelected,
  whatToSet,
  setWhatToSet }: Props) => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const titleObj = useRef<HTMLInputElement>(null);
  const beginTimeObj = useRef<HTMLInputElement>(null);
  const endTimeObj = useRef<HTMLInputElement>(null);
  const didMount = useRef(false);
  //追加する予定の一覧
  const [plans, setPlans] = useState<planMenuProps[]>([]);

  const deleteClick = (index: number) => {
    const newPlans = [...plans];
    newPlans.splice(index, 1);
    setPlans(newPlans);
  }
  //モーダルがオープンされているかの確認
  if (!isAddPlanClicked) return null;
  const hundleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  }
  const hundleBackClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsAddPlanClicked(false);
    setIsMenuOpen(false);
  }
  const addClick = () => {
    setIsMenuOpen(false);
    //何も入力されていない場合の確認
    if (!beginTimeObj.current?.value || !endTimeObj.current?.value || !titleObj.current?.value) {

    }
    else {
      setPlans([...plans, {
        planDetail: {
          beginTime: [Number(beginTimeObj.current.value.split(":")[0]), Number(beginTimeObj.current.value.split(":")[1])],
          endTime: [Number(endTimeObj.current.value.split(":")[0]), Number(endTimeObj.current.value.split(":")[1])],
          title: titleObj.current.value,
        },
        isImportant: false,
      }]);
      beginTimeObj.current.value = "";
      endTimeObj.current.value = "";
      titleObj.current.value = "";
    }
  }
  useEffect(() => {
    //予定候補が追加されたときに保存する
    if (!didMount.current) {
      didMount.current = true;
      localStorage.getItem("plans") ? setPlans(JSON.parse(localStorage.getItem("plans")!)) : setPlans([]);
    }
    else {
      const _plans = [...plans];
      //重要度順に並べ替える
      _plans.sort((a, b) => {
        //戻り値が正の時、並べ替える。
        const aImportance = a.isImportant ? 1 : 0;
        const bImportance = b.isImportant ? 1 : 0;
        return bImportance - aImportance;
      });
      localStorage.setItem("plans", JSON.stringify(_plans));
    }
    console.log(plans);
  }, [plans]);
  return (
    <div className="fixed z-20 inset-2 overflow-y-auto h-full"
      onClick={hundleBackClick}>
      <div className="fixed inset-0 bg-black opacity-65 transition-opacity blur-sm"></div>
      <motion.div className=" grid grid-rows-10 overflow-hidden fixed  w-full bottom-0 left-0 rounded-xl bg-white h-full"
        onClick={hundleModalClick}
        initial={{ y: "300%" }}
        animate={{ y: ["300%", "45%", "50%"] }}
        transition={{ duration: "0.6" }}>
        {/* 外枠 */}
        <motion.div className="row-span-10 grid grid-rows-10 overflow-hidden"
          animate={{ y: !isMenuOpen ? "0%" : "-50%" }}>
          <div className="row-span-5 bg-slate-200 grid grid-rows-10">
            {/* 以下、追加する予定を置いておくためのmodal */}
            <div className="row-span-6 bg-slate-300 grid grid-cols-2 grid-rows-4">
              {plans.map((plan, index) => {
                if (index >= 8) return null;
                return (
                  <div className="grid grid-cols-10 justify-between m-2 ">
                    <PlanList
                      planMenu={plan}
                      plans={plans}
                      setPlans={setPlans}
                      index={index}
                      isPlanSelected={isPlanSelected}
                      setIsPlanSelected={setIsPlanSelected}
                      whatToSet={whatToSet}
                      setWhatToSet={setWhatToSet}
                      setIsAddPlanClicked={setIsAddPlanClicked}
                    />
                    {/* <p className="col-span-2 my-auto text-center bg-rose-500 rounded-lg text-white p-1">削除</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3/5 my-auto col-span-2"
                      onClick={() => deleteClick(index)}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>)
              })}
            </div>
            <div className="row-span-2 text-center">
              <button onClick={() => setIsMenuOpen(true)} className=" mt-4 rounded-xl px-7 shadow-xl bg-gradient-to-br from-blue-500 to-blue-400 text-xl p-2 font-bold text-white">新規作成</button>
            </div>
          </div>

          <div className="row-span-5 grid grid-rows-10 bg-slate-200 gap-2">
            <div className="row-span-2 text-center">
              <h2 className="text-center text-lg font-bold">予定を追加する</h2>
              <input ref={titleObj} type="text" className="w-3/4 p-2 mx-auto border-2 border-gray-300 rounded-xl text-center" placeholder="タイトルを追加" />
            </div>
            <div className="row-span-2 text-center">
              <p className="text-center">開始時刻</p>
              <input ref={beginTimeObj} type="time" className="w-3/4 p-1 mx-auto border-2 border-gray-300 rounded-xl" placeholder="開始時刻を選択" />
            </div>
            <div className="row-span-2 text-center">
              <p className="text-center">終了時刻</p>
              <input ref={endTimeObj} type="time" className="w-3/4 p-1 mx-auto border-2 border-gray-300 rounded-xl" placeholder="終了時刻を選択" />
            </div>
            <div className="row-span-2  text-center ">
              <button onClick={addClick} className=" rounded-xl px-7 bg-gradient-to-br from-blue-500 shadow-xl to-blue-400 text-xl p-2 font-bold text-white w-3/5">追加</button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default AddPlanModal;
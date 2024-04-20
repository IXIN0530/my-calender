"use client"
import { planMenuProps, planType } from "@/app/type";
import { motion } from "framer-motion";
type Props = {
  planMenu: planMenuProps,
  plans: planMenuProps[],
  setPlans: (plans: planMenuProps[]) => void,
  index: number,
  isPlanSelected: boolean,
  setIsPlanSelected: (isPlanSelected: boolean) => void,
  whatToSet: planType,
  setWhatToSet: (whatToSet: planType) => void,
  setIsAddPlanClicked: (isAddPlanClicked: boolean) => void,
}
const PlanList = ({
  planMenu,
  plans,
  setPlans,
  index,
  isPlanSelected,
  setIsPlanSelected,
  whatToSet,
  setWhatToSet,
  setIsAddPlanClicked
}: Props) => {
  const starClick = () => {
    const newPlans = [...plans];
    newPlans[index].isImportant = !newPlans[index].isImportant;
    setPlans(newPlans);
  }
  const handleClick = () => {
    //予定をカレンダーに追加するためのもの
    setWhatToSet(planMenu.planDetail);
    setIsPlanSelected(true);
    setIsAddPlanClicked(false);
  }
  return (
    <motion.div className="text-center col-span-8 grid grid-cols-10">
      <div className="col-span-2 flex flex-row justify-center" onClick={starClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill={planMenu.isImportant ? "rgb(255,224,0)" : "rgba(0,0,0,0)"} viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor" className="">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      </div>
      <p className="text-center col-span-8 border border-gray-400 bg-white rounded-lg"
        onClick={handleClick}>
        {planMenu.planDetail.title}
      </p>
    </motion.div>
  )
}

export default PlanList;
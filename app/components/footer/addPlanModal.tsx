import { motion } from "framer-motion";
import { FormEvent, MouseEvent, useRef } from "react"
type Props = {
  isAddPlanClicked: boolean,
  setIsAddPlanClicked: (isAddPlanClicked: boolean) => void,
}
const AddPlanModal = ({ isAddPlanClicked, setIsAddPlanClicked }: Props) => {
  //モーダルがオープンされているかの確認
  if (!isAddPlanClicked) return null;

  const hundleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  }
  const hundleBackClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsAddPlanClicked(false);
  }
  return (
    <div className="fixed z-20 inset-2 overflow-y-auto h-full"
      onClick={hundleBackClick}>
      <div className="fixed inset-0 bg-black opacity-65 transition-opacity"></div>
      <motion.div className=" overflow-hidden fixed  w-full bottom-0 left-0 rounded-xl bg-white h-full"
        onClick={hundleModalClick}
        initial={{ y: "300%" }}
        animate={{ y: "20%" }}
        transition={{ duration: "0.3" }}>
        <div >hello</div>
      </motion.div>
    </div>
  )
}

export default AddPlanModal;
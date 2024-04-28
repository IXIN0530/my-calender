type Props = {
  isAddPlanClicked: boolean,
  setIsAddPlanClicked: (isAddPlanClicked: boolean) => void,
  isPlanSelected: boolean,
}

const Footer = ({ isAddPlanClicked, setIsAddPlanClicked, isPlanSelected }: Props) => {
  return (
    <div className="row-span-1 bg-sky-200 grid grid-cols-5 z-30"
      style={{ filter: isPlanSelected ? "brightness(0.7)" : "" }}>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1 flex justify-center my-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          className="bg-blue-500 w-3/5 h-3/5 text-white rounded-xl p-2 shadow-xl"
          style={{
            transitionDuration: "300ms",
            rotate: isAddPlanClicked ? "45deg" : "0deg",
            borderRadius: isAddPlanClicked ? "50%" : "",
            backgroundColor: isAddPlanClicked ? "rgb(255,80,80)" : "",
          }}
          onClick={() => setIsAddPlanClicked(!isAddPlanClicked)}>
          <path className="" stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </div>
  )
}

export default Footer;
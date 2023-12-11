import { RotatingLines } from "react-loader-spinner"
import { TString } from "../../interfaces/IGlobal"

interface ILoading {
  color?: TString;
  width?: TString;
}

const Loading = ({ color='#4897F7', width='34' }: ILoading) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <RotatingLines
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
  </div>
  )
}

export default Loading
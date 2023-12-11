import clsx from "clsx";
import { RotatingLines } from 'react-loader-spinner'
import { TBoolean, TChildren, TString } from "../../../interfaces/IGlobal";

interface IButton {
  title?: TString;
  isLoading?: TBoolean,
  children?: TChildren,
  className?: TString,
  isDisabled?: TBoolean
  handleClick?: () => void;
}

const Button = ({ title, isLoading, children, className, isDisabled=false, handleClick }: IButton) => {
  return (
    <button
      disabled={isDisabled ? isDisabled : isLoading}
      type="submit"
      onClick={() => handleClick && handleClick()}
      className={clsx(
        `text-whiteColor bg-primaryColor h-[51px] mt-4 rounded-md font-medium flex items-center justify-center tracking-[1px] w-full cursor-pointer`,
        { 
          ["bg-opacity-80"]: isLoading === true,
          ["bg-opacity-70"]: isDisabled === true,
          [className!]: className,
        }
      )}
    >
      {isLoading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
      ) : (
        <span>{title}{children}</span>
      )}
    </button>
  );
};

export default Button;

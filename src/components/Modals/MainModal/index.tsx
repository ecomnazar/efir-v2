import clsx from "clsx";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { IChildren } from "../../../interfaces/IGlobal";

interface IMainModal extends IChildren {
  isOpen: boolean;
  handleClick: () => void;
  minHeight?: string;
}

const MainModal = ({ children, isOpen, handleClick, minHeight }: IMainModal) => {
  const ref = useOutsideClick(() => {
    handleClick()
  });
  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen bg-black bg-opacity-30 z-50 fixed top-0 left-0 flex items-center justify-center text-whiteColor">
          <div
            ref={ref}
            className={clsx("modal w-full max-w-[500px] max-h-[90vh] bg-whiteColor rounded-lg p-4 overflow-y-scroll", {
              [minHeight!]: minHeight
            })}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default MainModal;

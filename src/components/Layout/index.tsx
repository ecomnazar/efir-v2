import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Toaster } from "react-hot-toast";
import ModalsProvider from "../../utils/ModalsProvider";

const Layout = () => {

  return (
    <div className="w-screen h-screen p-4 flex justify-between overflow-hidden bg-lightGreyColor">
      <div className="w-[300px] h-full px-4 flex flex-col justify-between">
          <Navbar />
          <ModalsProvider />
          <Toaster />
        <div className="w-full h-[200px] bg-primaryColor rounded-lg p-2 mt-auto flex flex-col justify-between">
          <div></div>
          <a 
            href="https://cloudy-escape-56159.postman.co/workspace/2832a358-f21b-43df-8312-74bb3b83059d/documentation/24380841-eb0df733-87cc-4200-9aad-a3ac4b5c9f1f" 
            className="h-[50px] bg-whiteColor text-darkGreyColor font-medium w-full rounded-lg flex items-center justify-center"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="w-[calc(100vw-350px)] h-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

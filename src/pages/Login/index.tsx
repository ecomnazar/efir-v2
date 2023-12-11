import { AiFillHeart } from "react-icons/ai";
import { TString } from "../../interfaces/IGlobal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { login } from "../../services/Login";

interface IInput {
  username: TString;
  password: TString;
}

const Login = () => {

  const { register, handleSubmit } = useForm<IInput>()
  const dispatch = useAppDispatch()

  const submit: SubmitHandler<IInput> = (value) => {
    dispatch(login({ username: value.username, password: value.password }))
  }

  return (
    <div className="w-screen h-screen bg-whiteColor p-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[425px] w-[550px] overflow-hidden bg-cover bg-center rounded-lg bg-[url('/images/Image.png')] p-8">
        <form onSubmit={handleSubmit(submit)} className="w-full h-full bg-whiteColor rounded-lg shadow-lg p-8 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <h2 className="mb-1">Username</h2>
              <input
                className="border-2 border-primaryColor font-normal w-full h-[50px] outline-none rounded-lg px-3"
                type="text"
                placeholder="Your username"
                {...register('username')}
              />
            </div>
            <div className="mb-2">
              <h2 className="mb-1">Password</h2>
              <input
                className="border-2 border-primaryColor font-normal w-full h-[50px] outline-none rounded-lg px-3"
                type="password"
                placeholder="Your password"
                {...register('password')}
              />
            </div>
            <button className="bg-primaryColor text-whiteColor w-full rounded-lg h-[50px] mt-[20px]">
              Войти
            </button>
          </div>
          <div>
            <p className="mt-4 text-center">
              Created with <AiFillHeart className="inline-block text-red-500" />{" "}
              by <span className="text-primaryColor font-medium">Yollo</span>{" "}
              Team
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

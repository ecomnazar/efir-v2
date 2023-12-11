import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Loading from "../../components/Loading";
import { ICategory } from "../../interfaces/ICategory";
import { deleteCategory, getCategories, showAddCategoryModal, updateCategory } from "../../services/Categories";
import { FaPlus } from 'react-icons/fa'
import { TNumber } from "../../interfaces/IGlobal";
import toast, { Toaster } from "react-hot-toast";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector((state) => state.categories.categories.data);
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  const openAddCategoryModal = () => dispatch(showAddCategoryModal())

  const save = async (id: TNumber, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { 
      id: id,
      name: String(inputRef.current?.value)
    }
    await dispatch(updateCategory({ data }))
    await dispatch(getCategories())
    toast.success('Edited')
    setActive(0)
  }


  const remove = async (id: TNumber) => {
    await dispatch(deleteCategory({ id }))
    // toast.success('Deleted')
    dispatch(getCategories())
  }

  return (
    <div>
      <Toaster />
      <h1 className="text-[20px] font-medium mb-2">Categories</h1>
      {!categories ? (
        <div className="relative h-[100vh]">
          <Loading />
        </div>
      ) : (
        <div className="bg-whiteColor rounded-lg p-4">
          <li className="flex justify-around items-center py-2">
            <div className="basis-[18%] text-center text-middleGreyColor">
              Name
            </div>
            <div className="basis-[18%] text-center text-middleGreyColor">
              Actions
            </div>
          </li>
          {categories?.map((elem: ICategory) => {
            const activeTitle = categories.find((elem) => elem.id === active)
            return (
              <div
                key={elem.id}
                className="flex justify-around items-center border-t-2 py-2"
              >
                {
                  elem.id === active
                   ? <div className="basis-[18%] text-center">
                    <input ref={inputRef} type="text" placeholder="Hi" className="py-1.5 rounded-md px-2 outline-none border text-center w-fit" defaultValue={activeTitle?.name} />
                   </div>
                   : <div className="basis-[18%] text-center">{elem?.name}</div>
                }
                <div className="basis-[18%] text-center flex items-center gap-x-4 justify-center">
                  {elem.id === active ? 
                    <button onClick={() => setActive(0)} className="bg-blue-500 text-whiteColor px-3 py-1.5 rounded-md">Cancel</button>
                  : <button onClick={() => setActive(elem.id)} className="bg-blue-500 text-whiteColor px-3 py-1.5 rounded-md">Edit</button>
                }
                  <button onClick={() => remove(elem.id)} className="bg-red-500 text-whiteColor px-3 py-1.5 rounded-md">Delete</button>
                  {elem.id === active && <form onSubmit={(e) => save(elem.id, e)}>
                    <button className="bg-green-500 text-whiteColor px-3 py-1.5 rounded-md">Save</button>
                    </form>}
                </div>
              </div>
            )
          })}
          <li onClick={openAddCategoryModal} className="flex justify-center items-center py-4 border-2 rounded-lg cursor-pointer">
            <FaPlus color={'#AEB8C5'} />
          </li>
        </div>
      )}
    </div>
  );
};

export default Categories;

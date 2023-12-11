import AddAdminModal from '../../components/Modals/AddAdminModal'
import AddCategoryModal from '../../components/Modals/AddCategoryModal'
import AddChannelModal from '../../components/Modals/AddChannelModal'
import AddPostModal from '../../components/Modals/AddPostModal'
import AddStoryModal from '../../components/Modals/AddStoryModal'
import AddUserAsChannelModal from '../../components/Modals/AddUserAsChannelModal'
import GetChannelModal from '../../components/Modals/GetChannelModal'
import GetPostModal from '../../components/Modals/GetPostModal'

const ModalsProvider = () => {
  return (
    <>
      <AddAdminModal />
      <AddCategoryModal />
      <AddChannelModal />
      <AddUserAsChannelModal />
      <AddPostModal /> 
      <GetPostModal />
      <GetChannelModal />
      <AddStoryModal />
    </>
  )
}

export default ModalsProvider
import UsersList from "../components/UsersList"
import { users } from "../../tempData.js"


const Users = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-[75px]">
      <UsersList users={users} />
    </div>
  )
}

export default Users

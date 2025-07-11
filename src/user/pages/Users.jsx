import UsersList from "../components/UsersList"

const users = [
    {
        id: 'u1',
        name: 'Amy Fisher',
        image: 'https://images.pexels.com/photos/27765567/pexels-photo-27765567.jpeg',
        places: 2
    },
    {
        id: 'u2',
        name: 'Mark Zuckerberg',
        image: '',
        places: 1
    },
    {
        id: 'u3',
        name: 'Sam Smith',
        image: '',
        places: 1
    }
]

const Users = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-[75px]">
      <UsersList users={users} />
    </div>
  )
}

export default Users

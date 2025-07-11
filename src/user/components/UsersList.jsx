import UserItem from "./UserItem";

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold">No users found</h1>
    );
  }

  return (
    <ul className="mx-auto max-w-screen-xl">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          places={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;

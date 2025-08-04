import UserItem from "./UserItem";

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <h1 className="text-center text-xl font-semibold">No users found</h1>
    );
  }

  return (
    <ul className="flex flex-col divide-y border-y h-full border-neutral-200 divide-neutral-200">
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

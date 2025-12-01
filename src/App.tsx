
import './App.css'
import UserCard from './components/UserCard'
import User1 from "./assets/icons8-doctor-50.png"

const Users =
  [
    {
      id: 1,
      name: "Nguyen Thanh Lan",
      email: "lan@gmail.com",
      role: "admin",
      avatar: User1
    },
    {
      id: 2,
      name: "Nguyen Thanh Hoang",
      email: "hoang@gmail.com",
      role: "user",
      avatar: User1
    },
    {
      id: 3,
      name: "Nguyen Thanh Phong",
      email: "phong@gmail.com",
      role: "user",
      avatar: User1
    },
    {
      id: 4,
      name: "Nguyen Thanh Hao",
      email: "Hao@gmail.com",
      role: "user",
      avatar: User1
    },
    {
      id: 5,
      name: "Nguyen Thanh Tam",
      email: "Tam@gmail.com",
      role: "user",
      avatar: User1
    },
  ]
function App() {

  return (
    <div className="w-full h-full flex  ">
      <div className="w-full h-full grid grid-cols-3 gap-3 ">
        {Users.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            email={user.email}
            role={user.role}
            avatar={user.avatar}
          />
        ))}
      </div>
    </div>
  )
}

export default App

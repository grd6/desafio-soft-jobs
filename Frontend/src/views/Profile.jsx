import axios from "axios";
import Context from "../contexts/Context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
console.log(setDeveloper)
  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem("token");
    axios
      .get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: user }) =>   setDeveloper({ ...user })) 
      
      .catch(({ response: [data] }) => {
        window.sessionStorage.removeItem("token");
        setDeveloper(null);
        navigate("/");
      });
      
  };

  useEffect(getDeveloperData, []);

  return (
    <div className="py-5">
      <h1>
        Bienvenido <span className="fw-bold">{getDeveloper?.email}</span>
      </h1>
      <h3>
      {getDeveloper?.users[0]?.rol} en {getDeveloper?.users[0]?.lenguage}
      
      </h3>
    </div>
  );
};

export default Profile;

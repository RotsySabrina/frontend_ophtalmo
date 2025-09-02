import { useEffect, useState } from "react";
import { getRoles } from "./api";

function App() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Liste des roles</h1>
      <ul>
        {roles.map((p) => (
          <li key={p.id}>{p.titre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

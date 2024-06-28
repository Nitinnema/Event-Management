import { RouterProvider, useNavigate } from "react-router-dom";
import { Router } from "./routes/Routes";
import { useState } from "react";

const App = () => {
  const [router, setRouter] = useState(Router);

  return (
    <div className="bg-primary font-primary">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

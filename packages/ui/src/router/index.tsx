import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import { userService } from "../services";

async function accessLoader() {
  try {
    await userService.initialState();
  } catch (e) {
    // do nothing
  }
}
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    loader: accessLoader,
  },
]);

export default router;

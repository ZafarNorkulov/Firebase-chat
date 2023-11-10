import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/constants";
import Login from "./components/auth/login";
import Chat from "./components/chat";
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat,
  },
];

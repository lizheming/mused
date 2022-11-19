import store from "../store";
import * as api from "../helpers/api";
import { setUser } from "../store/modules/user";

const userService = {
  getState: () => {
    return store.getState().user;
  },

  initialState: async () => {
    const { data: user } = (await api.getUser()).data;
    if (user) {
      store.dispatch(setUser(user));
    }
  },

  login: async ({ email, password }) => {
    const { data: user } = await api.signin(email, password);

  },
  doSignIn: async () => {
    const { data: user } = (await api.getMyselfUser()).data;
    if (user) {
      store.dispatch(setUser(convertResponseModelUser(user)));
    } else {
      userService.doSignOut();
    }
    return user;
  },
};

export default userService;

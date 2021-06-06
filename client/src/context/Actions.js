export const startLogin = (user) => ({
  type: "START_LOGIN",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (user) => ({
  type: "LOGIN_FAILURE",
});

export const StartUpdate = (user) => ({
  type: "START_UPDATE",
});

export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

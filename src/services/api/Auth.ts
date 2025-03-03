import Axios from "@/helpers/axios";

export class AuthAPI {
  static login = (body: Record<string, any>) => {
    return Axios.post("/auth/login", body);
  };

  static register = (body: Record<string, any>) => {
    return Axios.post("/auth/register", body);
  };

  static updatePassword = (body: Record<string, any>, token: string) => {
    return Axios.put("/auth/password/reset", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static forgotPassword = (body: Record<string, any>, token: string) => {
    return Axios.put("/auth/password/forgot", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static update = (body: Record<string, any>, token: string) => {
    return Axios.put("/users/profile/update", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static notifications = () => {
    return Axios.get("/me/notifications");
  };

  static confirm = (body: Record<string, any>, token: string) => {
    return Axios.post("/auth/confirm", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static me = () => {
    return Axios.get("/users/me");
  };
}

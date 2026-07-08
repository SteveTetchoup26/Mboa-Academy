import Axios from "@/helpers/axios";

export class InstitutionAPI {
  static getAll = () => {
    return Axios.get("/institutions");
  };

  static getOne = (id: number) => {
    return Axios.get(`/institutions/${id}`);
  };

  static create = (body: Record<string, any> | FormData) => {
    return Axios.post("/institutions/create", body);
  };

  static update = (id: number, body: Record<string, any> | FormData, token: string) => {
    return Axios.put(`/institutions/update/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static myInstitutions = (token: string) => {
    return Axios.get("/institutions/my-institution", {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static getCourses = (id: number) => {
    return Axios.get(`/institutions/${id}/courses`);
  };

  static getStats = (id: number) => {
    return Axios.get(`/institutions/${id}/stats`);
  };

  static addAdmin = (id: number, body: Record<string, any>, token: string) => {
    return Axios.post(`/institutions/${id}/admins`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  static removeAdmin = (id: number, userId: number, token: string) => {
    return Axios.delete(`/institutions/${id}/admins/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
}

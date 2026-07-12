import Axios from "@/helpers/axios";

export class WebinarAPI {
  // ─── Public ───

  static getAll = (params?: Record<string, any>) => {
    return Axios.get("/webinars", { params });
  };

  static getOne = (id: number) => {
    return Axios.get(`/webinars/${id}`);
  };

  // ─── Institution ───

  static getByInstitution = (institutionId: number) => {
    return Axios.get(`/webinars/institution/${institutionId}`);
  };

  // ─── Instructor ───

  static getMyWebinars = () => {
    return Axios.get("/webinars/my-webinars");
  };

  // ─── CRUD ───

  static create = (body: Record<string, any>) => {
    return Axios.post("/webinars/create", body);
  };

  static update = (id: number, body: Record<string, any>) => {
    return Axios.put(`/webinars/${id}`, body);
  };

  static updateStatus = (id: number, status: string) => {
    return Axios.patch(`/webinars/${id}/status`, { status });
  };

  static delete = (id: number) => {
    return Axios.delete(`/webinars/${id}`);
  };

  // ─── Room / Jitsi ───

  static generateRoom = (id: number) => {
    return Axios.post(`/webinars/${id}/room`);
  };

  // ─── Registration ───

  static register = (id: number, body?: Record<string, any>) => {
    return Axios.post(`/webinars/${id}/register`, body || {});
  };

  static unregister = (id: number) => {
    return Axios.delete(`/webinars/${id}/register`);
  };

  static getRegistrations = (id: number) => {
    return Axios.get(`/webinars/${id}/registrations`);
  };
}

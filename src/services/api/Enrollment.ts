import Axios from "@/helpers/axios";

export class EnrollmentAPI {
  static getOne = (id: number, token: string) => {
    return Axios.get(`/enrollments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
}

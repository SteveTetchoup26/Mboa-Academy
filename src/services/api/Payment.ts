import Axios from "@/helpers/axios";

export class PaymentAPI {
  static create = (body: Record<string, any>, token: string) => {
    return Axios.post("/payments/create", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static getAll = () => {
    return Axios.get("/payments");
  };

  static getOne = (id: number) => {
    return Axios.get(`/payments/${id}`);
  };
}

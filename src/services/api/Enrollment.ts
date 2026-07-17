import Axios from "@/helpers/axios";

export class EnrollmentAPI {
  static getOne = (id: number, token: string) => {
    return Axios.get(`/enrollments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static enrollWithCode = (courseId: number, accessCode: string) => {
    return Axios.post("/enrollments/enroll-with-code", {
      course_id: courseId,
      access_code: accessCode,
    });
  };
}

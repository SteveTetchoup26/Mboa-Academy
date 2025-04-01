import Axios from "@/helpers/axios";

export class CourseAPI {
  static create = (body: Record<string, any>, token: string) => {
    return Axios.post("/courses/create", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static getAll = () => {
    return Axios.get("/courses");
  };

  static getOne = (id: number) => {
    return Axios.get(`/courses/${id}`);
  };

  static getAllCoursesByInstructor = (token: string) => {
    return Axios.get("/courses/instructor-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static getAllCoursesEnrolled = (token: string) => {
    return Axios.get("/courses/enrolled", {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  static getAllCategories = () => {
    return Axios.get("/categories");
  }
}

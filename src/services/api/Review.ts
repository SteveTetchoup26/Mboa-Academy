import Axios from "@/helpers/axios";

export class ReviewAPI {
  static create = (data: { course_id: number; rating: number; comment?: string }) => {
    return Axios.post("/reviews/create", data);
  };

  static byCourse = (courseId: number) => {
    return Axios.get(`/reviews/course/${courseId}`);
  };

  static userReview = (courseId: number) => {
    return Axios.get(`/reviews/course/${courseId}/mine`);
  };

  static destroy = (id: number) => {
    return Axios.delete(`/reviews/delete/${id}`);
  };
}

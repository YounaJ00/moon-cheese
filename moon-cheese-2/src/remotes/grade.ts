import type { GradePoint } from '@/types/product';
import { http } from '@/utils/http';

interface GetGradePoint {
  gradePointList: GradePoint[];
}
export const getGrade = async () => {
  const response = await http.get<GetGradePoint>('/api/grade/point');
  return response;
};

import type { GradeType } from '@/server/data';
import { http } from '@/utils/http';

export type UserInfoResponse = {
  point: number;
  grade: GradeType;
};

export type GradePointListResponse = {
  gradePointList: Array<{ type: GradeType; minPoint: number }>;
};

export async function fetchUserInfo(): Promise<UserInfoResponse> {
  return http.get<UserInfoResponse>('/api/me');
}

export async function fetchGradePointList(): Promise<GradePointListResponse> {
  return http.get<GradePointListResponse>('/api/grade/point');
}

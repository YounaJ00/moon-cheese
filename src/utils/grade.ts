import { GRADE_POINTS, type GradeType } from '@/server/data';

export type GradeInfo = {
  currentGrade: GradeType;
  nextGrade: GradeType | null;
  currentPoint: number;
  pointsToNextGrade: number;
  progressPercentage: number;
};

const GRADE_ORDER: GradeType[] = ['EXPLORER', 'PILOT', 'COMMANDER'];

export function calculateGradeInfo(currentPoint: number): GradeInfo {
  const currentGrade = GradeUtils.getCurrentGrade(currentPoint);
  const nextGrade = GradeUtils.getNextGrade(currentGrade);

  if (!nextGrade) {
    return {
      currentGrade,
      nextGrade: null,
      currentPoint,
      pointsToNextGrade: 0,
      progressPercentage: 100,
    };
  }

  const currentGradeMinPoint = GRADE_POINTS[currentGrade];
  const nextGradeMinPoint = GRADE_POINTS[nextGrade];

  const ratio = GradeUtils.getProgressRatio(currentPoint, nextGradeMinPoint, currentGradeMinPoint);

  return {
    currentGrade,
    nextGrade,
    currentPoint,
    pointsToNextGrade: nextGradeMinPoint - currentPoint,
    progressPercentage: Math.round(ratio * 100),
  };
}
export const GradeUtils = {
  getCurrentGrade(currentPoint: number): GradeType {
    if (currentPoint >= GRADE_POINTS.COMMANDER) {
      return 'COMMANDER';
    }
    if (currentPoint >= GRADE_POINTS.PILOT) {
      return 'PILOT';
    }
    return 'EXPLORER';
  },
  getNextGrade(currentGrade: GradeType): GradeType | null {
    const currentIndex = GRADE_ORDER.indexOf(currentGrade);
    const nextIndex = currentIndex + 1;
    return nextIndex < GRADE_ORDER.length ? GRADE_ORDER[nextIndex] : null;
  },
  getProgressRatio(currentPoint: number, nextGradeMinPoint: number, currentGradeMinPoint: number): number {
    const range = nextGradeMinPoint - currentGradeMinPoint;
    if (range <= 0) {
      return 1;
    }
    const ratio = (currentPoint - currentGradeMinPoint) / range;
    return Math.min(Math.max(ratio, 0), 1);
  },
};

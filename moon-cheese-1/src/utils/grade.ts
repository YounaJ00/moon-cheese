import type { GradeType } from '@/server/data';
import type { ExchangeRate } from '@/types/currency';

export type GradeInfo = {
  currentGrade: GradeType;
  nextGrade: GradeType | null;
  currentPoint: number;
  pointsToNextGrade: number;
  progressPercentage: number;
};

export type GradePoint = {
  type: GradeType;
  minPoint: number;
};

const GRADE_ORDER: GradeType[] = ['EXPLORER', 'PILOT', 'COMMANDER'];

export const POINT_EARNING_RATE = 0.1 as const;

// 등급 계산 로직
export function getCurrentGrade(currentPoint: number, gradePointList: GradePoint[]): GradeType {
  let currentGrade: GradeType = 'EXPLORER';
  let maxMinPoint = -Infinity;

  for (const grade of gradePointList) {
    if (currentPoint >= grade.minPoint && grade.minPoint >= maxMinPoint) {
      currentGrade = grade.type;
      maxMinPoint = grade.minPoint;
    }
  }
  return currentGrade;
}

export function getNextGrade(currentGrade: GradeType, gradePointList: GradePoint[]): GradeType | null {
  const currentIndex = GRADE_ORDER.indexOf(currentGrade);

  for (let i = currentIndex + 1; i < GRADE_ORDER.length; i++) {
    const nextType = GRADE_ORDER[i];
    const exists = gradePointList.some(gradePoint => gradePoint.type === nextType);
    if (exists) {
      return nextType;
    }
  }
  return null;
}

export function getProgressRatio(
  currentPoint: number,
  currentGradeMinPoint: number,
  nextGradeMinPoint: number
): number {
  const range = nextGradeMinPoint - currentGradeMinPoint;
  if (range <= 0) {
    return 1;
  }
  const ratio = (currentPoint - currentGradeMinPoint) / range;
  return Math.min(Math.max(ratio, 0), 1);
}

export function calculateGradeInfo(currentPoint: number, gradePointList: GradePoint[]): GradeInfo {
  const currentGrade = getCurrentGrade(currentPoint, gradePointList);
  const nextGrade = getNextGrade(currentGrade, gradePointList);

  if (!nextGrade) {
    return {
      currentGrade,
      nextGrade: null,
      currentPoint,
      pointsToNextGrade: 0,
      progressPercentage: 100,
    };
  }

  const currentGradeMinPoint = gradePointList.find(gradePoint => gradePoint.type === currentGrade)?.minPoint ?? 0;
  const nextGradeMinPoint = gradePointList.find(gradePoint => gradePoint.type === nextGrade)?.minPoint ?? 0;

  const ratio = getProgressRatio(currentPoint, currentGradeMinPoint, nextGradeMinPoint);

  return {
    currentGrade,
    nextGrade,
    currentPoint,
    pointsToNextGrade: nextGradeMinPoint - currentPoint,
    progressPercentage: Math.round(ratio * 100),
  };
}

// 포인트 적립 정책 로직
export function earnedPointsFromUSD(amountInUSD: number): number {
  if (amountInUSD <= 0) {
    return 0;
  }
  return amountInUSD * POINT_EARNING_RATE;
}

export function earnedPointsFromKRW(amountInKRW: number, exchangeRate: ExchangeRate): number {
  if (amountInKRW <= 0) {
    return 0;
  }
  if (!exchangeRate?.KRW) {
    return 0;
  }
  const amountInUSD = amountInKRW / exchangeRate.KRW;
  return earnedPointsFromUSD(amountInUSD);
}

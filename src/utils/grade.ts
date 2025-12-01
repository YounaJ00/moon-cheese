import { GRADE_POINTS, type GradeType } from '@/server/data';
import type { ExchangeRate } from '@/types/currency';

export type GradeInfo = {
  currentGrade: GradeType;
  nextGrade: GradeType | null;
  currentPoint: number;
  pointsToNextGrade: number;
  progressPercentage: number;
};

const GRADE_ORDER: GradeType[] = ['EXPLORER', 'PILOT', 'COMMANDER'];

export const POINT_EARNING_RATE = 0.1 as const;

// 등급 계산 로직
export function getCurrentGrade(currentPoint: number): GradeType {
  if (currentPoint >= GRADE_POINTS.COMMANDER) {
    return 'COMMANDER';
  }
  if (currentPoint >= GRADE_POINTS.PILOT) {
    return 'PILOT';
  }
  return 'EXPLORER';
}

export function getNextGrade(currentGrade: GradeType): GradeType | null {
  const currentIndex = GRADE_ORDER.indexOf(currentGrade);
  const nextIndex = currentIndex + 1;
  return nextIndex < GRADE_ORDER.length ? GRADE_ORDER[nextIndex] : null;
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

export function calculateGradeInfo(currentPoint: number): GradeInfo {
  const currentGrade = getCurrentGrade(currentPoint);
  const nextGrade = getNextGrade(currentGrade);

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

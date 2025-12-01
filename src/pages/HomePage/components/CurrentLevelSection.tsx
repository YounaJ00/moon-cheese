import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useEffect, useState } from 'react';
import ErrorSection from '@/components/ErrorSection';
import { calculateGradeInfo, type GradeInfo } from '@/utils/grade';
import { fetchGradePointList, fetchUserInfo } from '@/api/user';

function CurrentLevelSection() {
  const [gradeInfo, setGradeInfo] = useState<GradeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadGradeData();
  }, []);

  async function loadGradeData() {
    setIsLoading(true);
    setError(null);
    try {
      const [userInfo, gradePointListResponese] = await Promise.all([fetchUserInfo(), fetchGradePointList()]);
      const calculatedGradeInfo = calculateGradeInfo(userInfo.point, gradePointListResponese.gradePointList);
      setGradeInfo(calculatedGradeInfo);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to load grade data'));
    } finally {
      setIsLoading(false);
    }
  }
  if (error) {
    return <ErrorSection onRetry={loadGradeData} />;
  }
  if (isLoading || !gradeInfo) {
    return null;
  }
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{gradeInfo.currentGrade}</Text>

          <ProgressBar value={gradeInfo.progressPercentage / 100} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {gradeInfo.currentPoint}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {gradeInfo.pointsToNextGrade}p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;

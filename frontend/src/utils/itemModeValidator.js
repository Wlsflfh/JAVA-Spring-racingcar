import { VALIDATION } from '../constants/itemMode';

/**
 * 아이템 모드 입력값 검증
 */
export const validateItemModeInput = (carNames, targetDistance) => {
  // 자동차 이름 검증
  if (!carNames || carNames.length === 0) {
    throw new Error('자동차 이름을 입력해주세요.');
  }

  if (carNames.some(name => name.length === 0)) {
    throw new Error('빈 자동차 이름은 입력할 수 없습니다.');
  }

  if (carNames.some(name => name.length > VALIDATION.MAX_CAR_NAME_LENGTH)) {
    throw new Error(`자동차 이름은 ${VALIDATION.MAX_CAR_NAME_LENGTH}자 이하여야 합니다.`);
  }

  // 중복 검사
  const uniqueNames = new Set(carNames);
  if (uniqueNames.size !== carNames.length) {
    throw new Error('자동차 이름은 중복될 수 없습니다.');
  }

  // 목표 거리 검증
  const distance = Number(targetDistance);
  
  if (!targetDistance || isNaN(distance)) {
    throw new Error('목표 거리를 입력해주세요.');
  }

  if (distance < VALIDATION.MIN_TARGET_DISTANCE) {
    throw new Error(`목표 거리는 최소 ${VALIDATION.MIN_TARGET_DISTANCE}칸 이상이어야 합니다.`);
  }

  if (distance > VALIDATION.MAX_TARGET_DISTANCE) {
    throw new Error(`목표 거리는 최대 ${VALIDATION.MAX_TARGET_DISTANCE}칸 이하여야 합니다.`);
  }

  return true;
};


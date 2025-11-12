/**
 * 입력값 검증 유틸리티
 */

const MAX_NAME_LENGTH = 5;

/**
 * 자동차 이름 배열과 시도 횟수 검증
 * @param {string[]} carNames - 자동차 이름 배열
 * @param {string|number} roundCount - 시도 횟수
 * @throws {Error} 검증 실패 시 에러
 */
export const validateInput = (carNames, roundCount) => {
  validateCarNamesExists(carNames);
  validateRoundCountExists(roundCount);
  validateCarNameLength(carNames);
  validateRoundCount(roundCount);
  validateNoDuplicateNames(carNames);
};

/**
 * 자동차 이름이 입력되었는지 검증
 */
const validateCarNamesExists = (carNames) => {
  if (!carNames || carNames.length === 0) {
    throw new Error('자동차 이름을 입력해주세요.');
  }
  
  if (carNames.some(name => !name || name.trim() === '')) {
    throw new Error('자동차 이름을 입력해주세요.');
  }
};

/**
 * 시도 횟수가 입력되었는지 검증
 */
const validateRoundCountExists = (roundCount) => {
  if (roundCount == null || roundCount === '') {
    throw new Error('시도 횟수를 입력해주세요.');
  }
};

/**
 * 자동차 이름 길이 검증 (5자 이하)
 */
const validateCarNameLength = (carNames) => {
  const invalidNames = carNames.filter(name => name.length > MAX_NAME_LENGTH);
  
  if (invalidNames.length > 0) {
    throw new Error(`자동차 이름은 ${MAX_NAME_LENGTH}자 이하여야 합니다.`);
  }
};

/**
 * 시도 횟수 검증 (자연수)
 */
const validateRoundCount = (roundCount) => {
  const num = Number(roundCount);
  
  if (isNaN(num)) {
    throw new Error('시도 횟수는 숫자여야 합니다.');
  }
  
  if (!Number.isInteger(num)) {
    throw new Error('시도 횟수는 정수여야 합니다.');
  }
  
  if (num <= 0) {
    throw new Error('시도 횟수는 1 이상이어야 합니다.');
  }
};

/**
 * 중복된 자동차 이름 검증
 */
const validateNoDuplicateNames = (carNames) => {
  const uniqueNames = new Set(carNames);
  
  if (uniqueNames.size !== carNames.length) {
    throw new Error('자동차 이름은 중복될 수 없습니다.');
  }
};



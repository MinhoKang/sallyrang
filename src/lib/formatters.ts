/**
 * 날짜 포맷팅 유틸리티 함수들
 */

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅
 * @param date - 포맷팅할 날짜 객체 또는 문자열
 * @returns YYYY.MM.DD 형식의 문자열 (예: "2025.01.31")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/**
 * 등록일 기준 경과 일수 계산
 * @param startDate - 등록 날짜
 * @returns "D+35일째" 형식의 문자열
 */
export function calculateDDay(startDate: Date | string): string {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const today = new Date();

  // 밀리초를 일 단위로 변환
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return `D+${diffDays}일째`;
}

/**
 * 전화번호 하이픈 포맷팅 (선택 사항)
 * @param phone - 하이픈이 없는 전화번호 문자열
 * @returns 하이픈이 추가된 전화번호 (예: "010-1234-5678")
 */
export function formatPhoneNumber(phone: string): string {
  // 숫자만 추출
  const cleaned = phone.replace(/\D/g, "");

  // 010-xxxx-xxxx 형식으로 포맷팅
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 02-xxx-xxxx 또는 02-xxxx-xxxx 형식
  if (cleaned.startsWith("02") && cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 기본 형식
  return phone;
}

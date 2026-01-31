/** @type {import("prettier").Config} */
export default {
  // 한 줄의 최대 문자 길이
  printWidth: 80,

  // 탭 너비
  tabWidth: 2,

  // 스페이스 사용 (탭 사용 안 함)
  useTabs: false,

  // 세미콜론 사용
  semi: true,

  // 싱글 쿼트 사용
  singleQuote: true,

  // 트레일링 쉼마 (ES5 호환)
  trailingComma: 'es5',

  // 객체 리터럴에서 괄호 안에 스페이스 추가
  bracketSpacing: true,

  // 화살표 함수 파라미터에 항상 괄호 추가
  arrowParens: 'always',

  // JSX 속성에 싱글 쿼트 사용
  jsxSingleQuote: true,

  // 파일 끝에 개행 추가
  endOfLine: 'lf',

  // Tailwind CSS 클래스명 정렬
  plugins: ['prettier-plugin-tailwindcss'],
};

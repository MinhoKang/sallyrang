"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * 다크/라이트 모드 테마 제공자
 * - next-themes를 사용한 클라이언트 컴포넌트
 * - 시스템 설정 자동 감지 지원
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

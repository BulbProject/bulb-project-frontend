/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

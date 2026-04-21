import { ReactNode } from "react";

interface IPageContainer {
  page: string;
  children: ReactNode;
  styles?: string;
}

export default function PageContainer({
  page,
  children,
  styles,
}: IPageContainer) {
  return (
    <div
      id={`${page}-page`}
      className="flex justify-center"
    >
      <div
        id={`${page}-container`}
        className={`flex flex-col flex-1 max-w-7xl ${styles}`}
      >
        {children}
      </div>
    </div>
  );
}

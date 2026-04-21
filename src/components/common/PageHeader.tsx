interface IPageHeader {
  page: string;
  title: string;
  sub: string;
}

export default function PageHeader({ page, title, sub }: IPageHeader) {
  return (
    <div
      id={`${page}-title`}
      className="flex flex-col py-8 gap-1"
    >
      <h1
        id={`${page}-title-main`}
        className="font-bold text-4xl"
      >
        {title}
      </h1>
      <h2
        id={`${page}-title-sub`}
        className="font-bold text-xl"
      >
        {sub}
      </h2>
    </div>
  );
}

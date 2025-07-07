"use client";
import Link from "next/link";

const BreadcrumbsStatic = ({ breadcrumbs }) => {
  return (
    <div
      data-aos="fade-left"
      className={`sectionPaddingX mb-14 mt-8 flex items-center gap-2`}
    >
      <Link className={`text-base text-primary`} href={`/`}>
        Početna
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const finalClass = isLast ? " text-lightGreen" : "text-primary";

        return (
          <div key={index} className="flex truncate">
            <span className="mr-2 text-base text-primary">/</span>
            {breadcrumb.url ? (
              <Link
                href={breadcrumb.url}
                className={`${finalClass} ${breadcrumb.class} truncate`}
              >
                {breadcrumb.name}
              </Link>
            ) : (
              <div className={`${finalClass} ${breadcrumb.class} truncate`}>
                {breadcrumb.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadcrumbsStatic;

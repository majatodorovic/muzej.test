import CategoryData from "@/app/category/components/CategoryData";
import { headers } from "next/headers";

export const CategoryPage = ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri, viewed },
  category_id,
}) => {
  const slug = path[path?.length - 1];
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];

  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter ? filter.split("=") : ["", undefined];
    const selectedValues = selected ? selected.split("_") : undefined;
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  let headersList = headers();
  let base_url = headersList?.get("x-base_url");

  return (
    <CategoryData
      category_id={category_id}
      base_url={base_url}
      path={path}
      slug={slug}
      viewed={viewed}
      sortField={sortField}
      sortDirection={sortDirection}
      strana={page}
      allFilters={[]}
      filters={filters}
    />
  );
};

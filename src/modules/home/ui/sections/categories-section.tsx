"use client";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";

interface CategoriesSectionProps {
  categoryId: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense
      fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}
    >
      <ErrorBoundary fallback={<p>Error!</p>}>
        <CategoriesList categoryId={categoryId}></CategoriesList>
      </ErrorBoundary>
    </Suspense>
  );
};

/**
 * Pass categoryId to the url first, then using page.tsx transfer categoryId to badget
 * @param param0
 * @returns
 */
export const CategoriesList = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  const data = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  return (
    <div>
      <FilterCarousel
        onSelect={onSelect}
        data={data}
        value={categoryId}
      ></FilterCarousel>
    </div>
  );
};

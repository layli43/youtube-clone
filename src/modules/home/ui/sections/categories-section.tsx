"use client";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
  categoryId: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <CategoriesList categoryId={categoryId}></CategoriesList>
      </ErrorBoundary>
    </Suspense>
  );
};

export const CategoriesList = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  return (
    <div>
      <FilterCarousel data={data}></FilterCarousel>
    </div>
  );
};

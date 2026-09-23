'use client';

import { CategoryTable } from './categoryTable';

export default function CategoryPage() {
  return (
    <div className="flex flex-col m-8 gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold uppercase">Categories (Seller)</h1>
          <p className="text-sm">Available Categories are shown below:</p>
        </div>
      </div>
      <CategoryTable />
    </div>
  );
}

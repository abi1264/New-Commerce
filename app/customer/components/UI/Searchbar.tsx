import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-7xl gap-1 rounded-xl border border-gray-300 px-4 py-2 focus-within:border-blue-500">
      <Search size={20} className=" text-gray-400" />

      <input
        type="text"
        placeholder="Search for products"
        className=" focus:border-blue-500 px-2 w-full outline-none"
      />
    </div>
  );
}

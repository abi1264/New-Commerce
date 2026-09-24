import { Handbag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-footer text-white py-4 flex flex-col sm:flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col gap-3  max-w-120 p-6 ">
        <div className="flex items-center gap-3 ">
          <Handbag size={30} className="bg-blue-600 text-white rounded p-1" />
          <h1 className="text-white font-bold sm:text-md md:text-xl lg:text-3xl">
            Mero
            <span className="sm:text-md md:text-xl lg:text-3xl font-bold text-blue-600">
              {' '}
              Bazar
            </span>
          </h1>
        </div>
        <div className=" text-text-ash">
          Mero Bazar connects thousands of individual buyers and sellers. It's a
          certified and trusted C2C e-commerce platform.
        </div>
        <div>
          <span className="flex items-center gap-1 text-text-ash">
            Customer Service:
            <span className="text-white font-bold">+977 9761807892</span>
          </span>
        </div>
      </div>
      {/* next 3 sections */}
      <div className="flex flex-col sm:flex-col md:flex-row gap-8 p-6">
        <div className="flex flex-col gap-2">
          <span className="uppercase text-white font-bold text-md ">
            Sell on Mero Bazar
          </span>
          <div className="flex flex-col gap-1 text-text-ash text-sm">
            <span>Apply for Seller Account</span>
            <span>Comission and Fees</span>
            <span>Product and Advertising</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="uppercase text-white font-bold text-md">
            Customer Support
          </span>
          <div className="flex flex-col gap-1 text-text-ash text-sm">
            <span>Help Center and FAQs</span>
            <span>Returns & Refunds</span>
            <span>Privacy Policy</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="uppercase text-white font-bold text-md">
            Additional Services
          </span>
          <div className="flex flex-col gap-1 text-text-ash text-sm">
            <span className="max-w-70 hover:cursor-pointer">
              Custom e-commerce system for your bussiness
            </span>
            <span>E-learning platform</span>
            <span>Join our team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

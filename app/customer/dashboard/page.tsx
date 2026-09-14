'use client';
import { Button } from '../components/UI/Button';
import Image from 'next/image';

export default function CustomerDashboard() {
  function handleClick() {
    window.open('https://wa.me/9761807892', '_blank');
  }
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-10">
          <div className="border  border-gray-300 rounded-lg p-6 flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <Image
              src="/biscuit.jpg"
              alt="mero biscuit"
              width={200}
              height={50}
              className=""
            />
            <h2 className="text-xl font-semibold text-red-500">Biscuit</h2>

            <p className="text-gray-500 ">Mero Mitho biscuit</p>
            <div className="flex justify-between">
              <p className="text-lg font-bold ">Rs.1200</p>
              <p className="text-md ">Discount: 5% </p>
            </div>
            <p>Available Quantity: 4</p>
            <Button title="Contact Seller" onClick={handleClick} />
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center p-4 bg-sky-900 shadow-gray-500">
        <div>
          <h2 className="text-2xl font-semibold gap-2 items-center px-3">
            <Link href="/">GOMYCODE</Link>
          </h2>
        </div>

        <div className="flex items-center gap-4 px-3">
          <h2 className="text-2xl font-semibold gap-2 items-center px-3">
            <Link href={"/dashboard"}>Dashboard</Link>
          </h2>
          <h2 className="text-2xl font-semibold gap-2 items-center px-3">
            <Link href={"/student"}>Student</Link>
          </h2>
          <h2 className="text-2xl font-semibold gap-2 items-center px-3">
            <Link href={"/product"}>Product</Link>
          </h2>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

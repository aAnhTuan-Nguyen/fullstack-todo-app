import React from "react"
import { Link } from "react-router"

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
    text-center bg-slate-100"
    >
      <img
        src="404_NotFound.png"
        alt="not found"
        className="max-w-full mb-6 w-96"
      />
      <p className="text-2xl font-medium text-gray-700">
        Trang bạn vào ko tồn tại
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 mt-4 font-medium text-white 
        transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Click here to go back
      </Link>
    </div>
  )
}

export default NotFound

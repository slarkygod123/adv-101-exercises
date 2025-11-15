import Link from "next/link";


export default function Home(){
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-1">
      <h1 className="text-lg text-center mb-2">Welcome to Home Page</h1>
      {
        [
          {buttonName: "Login", to: "/login"},
          {buttonName: "Register", to: "/register"}
        ].map(btn => ( 
          <Link
          key={btn.buttonName} 
          href={btn.to}
          className="border-2 border-black rounded-md text-center py-1 px-7">
          <span>
          {btn.buttonName}
          </span>
          </Link>
          ))
        }
      </div>
    </div>
  );
}
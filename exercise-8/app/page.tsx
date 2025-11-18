import Link from "next/link";

export default function Home(){
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-xl mb-2">Welcome</h1>
      <div className="flex flex-col space-y-1">
      {
        [
          {name: "Register", redirectTo: "/register"},
          {name: "Login", redirectTo: "/login"},
        ].map((n, i) => (
          <Link 
          className="rounded-md py-1 px-4 border-2 border-black text-center"
          key={i}
          href={n.redirectTo} >{n.name}</Link>
          ))
        }
      </div>
    </div>
  );
}
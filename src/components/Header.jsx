import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center mx-auto">
      <div className="flex">
        <img
          src={logo}
          alt="barnick-logo"
          className="w-20 h-20 mt-5 ml-5 my-4"
        />
      </div>
      <div className="flex">
        <h3 className="mt-10 ml-5 my-4 text-3xl font-bold text-black">
          Barnick Pracharani
        </h3>
      </div>
    </div>
  );
}

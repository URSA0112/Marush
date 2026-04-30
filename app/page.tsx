import Link from "next/link";
import Devpage from "./devpage";
import Navigation from "./components/Navigation/navigation";

export default function Page() {
  return (
    <>
      <Devpage></Devpage>
      <Navigation />
    </>
  );
}
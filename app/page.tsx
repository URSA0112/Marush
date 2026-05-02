import Link from "next/link";
import Devpage from "./devpage";
import Navigation from "./components/Navigation/navigation";
import MovingWords from "./components/Reusable/movingWords";
import DateRangePicker from "./booking/dateRangePicker";

export default function Page() {
  return (
    <>
      <Devpage></Devpage>
      <Navigation />
      <MovingWords></MovingWords>
      <section id="home" className="mt-80 bg-fog h-screen ">home</section>
      <DateRangePicker/>
    </>
  );
}
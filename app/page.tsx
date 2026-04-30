import Link from "next/link";

export default function Page() {
  return (
    <div className="flex w-full justify-center p-2">
      <Link href="/design" className="m-btn">
        <span className="arr">→</span> Design page
      </Link>
    </div>
  );
}
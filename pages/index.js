import Link from "next/link";
export default () => (
  <>
    <h1>Next Sandbox</h1>
    <div>
      Hello World.{" "}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  </>
);

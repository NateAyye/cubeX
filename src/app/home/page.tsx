import Link from "next/link";
import React from "react";

const HomePage: React.FC = ({}) => {
  return (
    <div>
      <div>
        <Link href="/api/auth/signin">Sign In</Link>
        <Link href="/api/auth/signout">Log Out</Link>
      </div>
      HomePage
    </div>
  );
};

export default HomePage;

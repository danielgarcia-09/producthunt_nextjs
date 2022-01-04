import styled from "@emotion/styled";
import Link from "next/link";
import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--grey2);
    font-family: "PT Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href={"/"}>Home</Link>
      <Link href={"/popular"}>Popular</Link>
      {user && <Link href={"/new-product"}>New Product</Link>}
    </Nav>
  );
};

export default Navigation;

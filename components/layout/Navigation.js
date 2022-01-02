import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const Nav = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--grey2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

const Navigation = () => {
    return (
        <Nav>
            <Link href={'/'}>Home</Link>
            <Link href={'/popular'}>Popular</Link>
            <Link href={'/new-product'}>New Product</Link>
        </Nav>
    );
}
 
export default Navigation;
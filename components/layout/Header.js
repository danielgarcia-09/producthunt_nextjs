import React, { useContext } from "react";
import { FirebaseContext } from '../../firebase';
import Link from "next/link";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;

  &:hover {
      cursor: pointer;
  }
`;

const Header = () => {

  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
            css={css`
               display: flex;
               align-items: center;  
            `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search />
          <Navigation />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >Hello: {user.displayName}</p>

              <Button
                bgColor
                onClick={()=> firebase.signOut()}
              >Sign off</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor>Login</Button>
              </Link>
              <Link href="/sign-on">
                <Button>Sign on</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;

import { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--grey3);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/img/search.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 3px;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

const useSearch = () => {
  const [search, setSearch] = useState("");

  const searchProduct = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    Router.push({
      pathname: "/search",
      query: { s: search },
    });
  };

  return {
    setSearch,
    searchProduct,
    InputText,
    InputSubmit,
  };
};

export default useSearch;

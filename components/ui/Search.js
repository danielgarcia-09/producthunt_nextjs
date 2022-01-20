import React from "react";
import { css } from "@emotion/react";
import useSearch from "../../hooks/useSearch";

const Search = () => {

    const { setSearch, searchProduct, InputText, InputSubmit} = useSearch();

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={searchProduct}
        >
            <InputText
                type={"text"}
                placeholder="Search Products"
                onChange={e=> setSearch(e.target.value)}
            />

            <InputSubmit type="submit">Search</InputSubmit>
        </form>
    );
}
 
export default Search;
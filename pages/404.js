import { css } from '@emotion/react';

const Error404 = ({message}) => {
    return (
        <h1
            css={css`
                margin-top: 15rem;
                text-align: center;
            `}
        >{message}</h1>
    );
}
 
export default Error404;
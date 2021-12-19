import Link from "next/link";
import React from "react";

const Nav = () => {
    return (
        <nav>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/'}>Populares</Link>
            <Link href={'/'}>Nuevo Producto</Link>
        </nav>
    );
}
 
export default Nav;
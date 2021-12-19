import React from 'react';
import Search from '../ui/Search';
import Nav from './Nav';

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />
                    <Nav />
                </div>

                <div>
                    <p>Hello: Daniel</p>

                    <button type='button'>Sign off</button>
                </div>
            </div>
        </header>
    );
}
 
export default Header;
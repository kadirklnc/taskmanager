import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';
import './Main.css';

export default function Main() {
    return (
        <div>
            <Header />
            <div className='mainContainer'> 
                <SideBar className='sidebar' />
                <main className='mainPage content'> 
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

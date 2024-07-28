import React from 'react'
import { Nav, NavLink } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function PermitRouter() {
    return (
        <div className="leave-request-container"> 
            <h3>İzin İşlemleri</h3>
            <Nav variant="tabs">
                <Nav.Item>
                    <NavLink to="/homepage/permit" exact className="nav-link">İzin Taleplerim</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/person" className="nav-link">İzin Onayları</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/people" className="nav-link">İzinli Çalışanlar</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/years" className="nav-link">Yıllık İzin Süreleri</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/all" className="nav-link">Tüm İzinler</NavLink>
                </Nav.Item>
            </Nav>

            <Outlet/>
        </div>
    )
}

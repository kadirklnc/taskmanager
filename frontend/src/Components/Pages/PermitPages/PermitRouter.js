import React,{useContext} from 'react'
import { Nav,  } from 'react-bootstrap';
import { Outlet ,NavLink} from 'react-router-dom';

import { AuthContext } from '../../../Context/AuthContext';

export default function PermitRouter() {
    const { authState } = useContext(AuthContext);
    const isAdmin = authState.roles.includes('ROLE_ADMIN');
  const isUser = authState.roles.includes('ROLE_USER');
  const isMod = authState.roles.includes('ROLE_MODERATOR');
    return (
        <div className="leave-request-container"> 
            <h3>İzin İşlemleri</h3>
            <Nav variant="tabs">
                <Nav.Item>
                    <NavLink to="/homepage/permit" exact className="nav-link">İzin Taleplerim</NavLink>
                </Nav.Item>
                {isAdmin && <Nav.Item>
                    <NavLink to="/homepage/permit/person" className="nav-link">İzin Onayları</NavLink>
                </Nav.Item>}
                {(isAdmin || isMod)&& 
                <> 
                <Nav.Item>
                    <NavLink to="/homepage/permit/people" className="nav-link">İzinli Çalışanlar</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/years" className="nav-link">Yıllık İzin Süreleri</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/homepage/permit/all" className="nav-link">Tüm İzinler</NavLink>
                </Nav.Item> 
                </>
                }
            </Nav>

            <Outlet/>
        </div>
    )
}

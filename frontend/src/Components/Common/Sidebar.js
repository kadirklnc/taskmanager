import React, { useState, useContext } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import '../Common/Sidebar.css';
import { AuthContext } from '../../Context/AuthContext';

function SideBar() {

    const { authState } = useContext(AuthContext);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => setShowSubMenu(!showSubMenu);
    const isAdmin = authState.roles.includes('ROLE_ADMIN');
    const isUser = authState.roles.includes('ROLE_USER');
    const isMod = authState.roles.includes('ROLE_MODERATOR');

    return (
        <div className="sidebar-container">
            <CDBSidebar className="cdb-sidebar">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} className="sidebar-header">
                    DailyChart
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/homepage" activeClassName="activeClicked" >
                            <CDBSidebarMenuItem icon="columns" className='item'>Anasayfa</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/homepage/mypage" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Benim Sayfam</CDBSidebarMenuItem>
                        </NavLink>

                        <div className="menu-item-with-icon" onClick={toggleSubMenu}>
                            <NavLink exact activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table" >İzin İşlemleri</CDBSidebarMenuItem>
                            </NavLink>
                            <i className={`fa fa-chevron-${showSubMenu ? 'up' : 'down'} sidebar-menu-icon`}></i>
                        </div>

                        {showSubMenu ? (
                            <>
                                {!isAdmin && (
                                    <NavLink exact to="/homepage/permit" activeClassName="activeClicked">
                                        <CDBSidebarMenuItem className='subMenuTest'>İzin Taleplerim</CDBSidebarMenuItem>
                                    </NavLink>
                                )}
                                {isAdmin && (
                                    <>
                                        <NavLink exact to="/homepage/permit/person" activeClassName="activeClicked">
                                            <CDBSidebarMenuItem className='subMenuTest'>İzin Onaylari</CDBSidebarMenuItem>
                                        </NavLink>
                                        <NavLink exact to="/homepage/permit/people" activeClassName="activeClicked">
                                            <CDBSidebarMenuItem className='subMenuTest'>İzinli Çalışanlar</CDBSidebarMenuItem>
                                        </NavLink>
                                        <NavLink exact to="/homepage/permit/years" activeClassName="activeClicked">
                                            <CDBSidebarMenuItem className='subMenuTest'>Yıllık İzin Süreleri</CDBSidebarMenuItem>
                                        </NavLink>
                                        <NavLink exact to="/homepage/permit/all" activeClassName="activeClicked">
                                            <CDBSidebarMenuItem className='subMenuTest'>Tüm İzinler</CDBSidebarMenuItem>
                                        </NavLink>
                                    </>
                                )}
                            </>
                        ) : (<></>)}
                        <NavLink exact to="/homepage/employees" activeClassName="activeClicked">
                            {(isAdmin || isMod) &&
                                <CDBSidebarMenuItem icon="users">Çalışanlar</CDBSidebarMenuItem>}
                        </NavLink>

                        <NavLink exact to="/homepage/departments" activeClassName="activeClicked">
                            {(isAdmin || isMod) &&
                                <CDBSidebarMenuItem icon="chart-line">Departmanlar</CDBSidebarMenuItem>}
                        </NavLink>

                        {/* <NavLink exact to="/homepage/organization" activeClassName="activeClicked">
                            {(isAdmin || isMod) &&
                                <CDBSidebarMenuItem icon="sitemap">Organization</CDBSidebarMenuItem>}
                        </NavLink> */}
                        <NavLink exact to="/homepage/report" activeClassName="activeClicked">
                            {(isAdmin || isMod) &&
                                <CDBSidebarMenuItem icon="chart-bar">Raporlar</CDBSidebarMenuItem>}
                        </NavLink>
                        <NavLink exact to="/homepage/settings" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="cog">Ayarlar</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                {/* <CDBSidebarFooter className="sidebar-footer">
                    Sidebar Footer
                </CDBSidebarFooter> */}
            </CDBSidebar>
        </div>
    )
}

export default SideBar;

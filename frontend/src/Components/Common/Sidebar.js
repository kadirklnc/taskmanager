import React, { useState } from 'react';
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

function SideBar() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => setShowSubMenu(!showSubMenu);

    return (
        <div className="sidebar-container">
            <CDBSidebar className="cdb-sidebar">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} className="sidebar-header">
                    DailyChart
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/homepage" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Anasayfa</CDBSidebarMenuItem>
                        </NavLink>
                        <div className="menu-item-with-icon" onClick={toggleSubMenu}>
                            <NavLink exact  activeClassName="activeClicked">
                                <CDBSidebarMenuItem icon="table">İzin İşlemleri</CDBSidebarMenuItem>
                            </NavLink>
                            <i className={`fa fa-chevron-${showSubMenu ? 'up' : 'down'} sidebar-menu-icon`}></i>
                        </div>

                        {showSubMenu ? (
                            <>
                                <NavLink exact to="/homepage/permit" activeClassName="activeClicked">
                                    <CDBSidebarMenuItem className='subMenuTest'>İzin Taleplerim</CDBSidebarMenuItem>
                                </NavLink>
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
                        ) : (<></>)}

                        <NavLink exact to="/homepage/employes" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Çalışanlar</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/departmans" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Departmanlar</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/organization" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="sitemap">Organization</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/inventory" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="boxes">Envanter ve Zimmet</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/travel" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="plane">Seyahat İşlemleri</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/expense" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="money-bill">Avans ve Harcama</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/report" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-bar">Raporlar</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/homepage/settings" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="cog">Ayarlar</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter className="sidebar-footer">
                    Sidebar Footer
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}

export default SideBar;

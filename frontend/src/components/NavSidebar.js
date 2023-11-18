// React / Packages
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
// ~

// Assets
import {
    HomeModernIcon, CogIcon, ArrowLeftOnRectangleIcon, ShieldExclamationIcon,
    ChevronDownIcon, ChevronUpIcon, UserCircleIcon, UserGroupIcon, DocumentCheckIcon
} from "@heroicons/react/24/solid";
import Logo from "../assets/logo-no-background.png";

// API
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NavSideBar() {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const [expandAdminMenu, setExpandAdminMenu] = useState(true);

    return (
        <div className="h-full px-4 py-4 m-2 rounded-l-lg overflow-y-auto bg-background-minor select-none">
            <ul className="space-y-1 font-medium text-sm">
                <li>
                    <NavLink
                        id="link-home"
                        to="/"
                        className="flex items-center p-2 text-text-secondary rounded-lg hover:text-text-primary transition duration-300 group"
                    >
                        <img src={Logo} />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="link-organisation-home"
                        to="/organisation"
                        className="flex items-center p-2 text-text-secondary rounded-lg hover:text-text-primary transition duration-300 group"
                    >
                        <HomeModernIcon className="w-5 h-5" />
                        <span className="ml-3">Organisation</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        id="link-profile"
                        to="/profile"
                        className="flex items-center p-2 text-text-secondary rounded-lg hover:text-text-primary transition duration-300 group"
                    >
                        <UserCircleIcon className="w-5 h-5" />
                        <span className="ml-3">Profile</span>
                    </NavLink>
                </li>

                { user.isAdmin && <li
                    className="flex items-center p-2 gap-2 text-text-secondary rounded-lg hover:cursor-pointer hover:text-text-primary transition duration-300 group"
                    onClick={() => setExpandAdminMenu(!expandAdminMenu)}
                >
                    <div className="flex items-center">
                        <CogIcon className="w-5 h-5 mr-2" />
                        Admin
                    </div>
                    {expandAdminMenu ? (
                        <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                        <ChevronUpIcon className="w-4 h-4" />
                    )}
                </li>}
                {user.isAdmin && expandAdminMenu && (
                    <ul className="ml-6 space-y-2">
                        <li>
                            <NavLink
                                id="link-admin-moderation"
                                to="/admin/moderation"
                                className="flex items-center p-2 text-text-secondary rounded-lg hover:text-text-primary transition duration-300 group"
                            >
                                <UserGroupIcon className="w-5 h-5 " />
                                <span className="ml-3 ">Moderation</span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                id="link-admin-application"
                                to="/admin/application"
                                className="flex items-center p-2 text-text-secondary rounded-lg hover:text-text-primary transition duration-300 group"
                            >
                                <DocumentCheckIcon className="w-5 h-5 " />
                                <span className="ml-3 ">Application</span>
                            </NavLink>
                        </li>
                    </ul>
                )}
                <li
                    className="flex items-center p-2 text-text-warn-light rounded-lg hover:cursor-pointer hover:text-text-warn transition duration-300 group"
                    onClick={logout}
                >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 " />
                    <span className="ml-3 ">Logout</span>
                </li>
            </ul>

        </div>
    );
}

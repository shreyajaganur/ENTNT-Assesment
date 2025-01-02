import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => { /* TAKING DYNAMIC VALUES USING HOOKS */
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  /* TWO STATES AND ITS STYLE PROPERTIES */

  return (/* This is a comment inside JSX */
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>{/* render react fragment */}
          <div className="flex justify-between items-center"> {/* ml-3 --push from left| mt--push from top in a flex comtainer | font | in dark mode make the color as white  */}
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span> ENTNT MODULES </span>{/* Sidebar heading */}
            </Link>{/* below is a button called menu that will close the sidebar when we needed, that has a callback func  */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)} /* TOGGLE THE MENU BUTTON  WHEN ONCLICKED */
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">{/* LOOP TO DISPLAY THE SIDEBAR SECTION DISPLAY TITLE FROM LINK */}
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>{/* DIAPLAY NAME */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name} /* UNIQUE NAME */
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })} /* IF LINK/ HOVERED IS ACTIVE USE THE ACTIVE STATE STYLE ELSE USE NORMAL STATE STYLE (DECLEARED ABOVE) */
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}{/* DISPLAY THE ICON AND ITS NAMES */}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

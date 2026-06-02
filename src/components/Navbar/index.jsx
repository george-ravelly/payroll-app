import './style.css'
import { Icon } from '@mdi/react'
import { mdiBellRingOutline, mdiMagnify, mdiHome, mdiAccountSettings, mdiPageLayoutSidebarLeft, mdiAccount, mdiAccountTie, mdiFaceAgent } from '@mdi/js'

export default function NavBarAPP({ content }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <Icon path={mdiPageLayoutSidebarLeft} size={1} />
          </label>
          <div className="flex justify-between align-middle flex-1">
          <div className="pt-2">Folha de Pagamento</div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Perfil
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li><a>Configurações</a></li>
              <li><a>Sair</a></li>
            </ul>
          </div>
          </div>
        </nav>
        {/* Page content here */}
        {content}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <Icon path={mdiHome} size={1} className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Folha de Pagamento</span>
              </button>
            </li>

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <Icon path={mdiAccount} size={1} className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Pessoa fisica</span>
              </button>
            </li>
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <Icon path={mdiAccountTie} size={1} className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Pessoa juridica</span>
              </button>
            </li>
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                {/* Settings icon */}
                <Icon path={mdiFaceAgent} size={1} className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Suporte</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
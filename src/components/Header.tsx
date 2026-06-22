import { Icon } from "@mdi/react";
import { mdiHome} from '@mdi/js'
import { useNavigate } from "react-router-dom";
import { memo, useRef } from "react"
import { Employee } from "@/types/employee";
import Profile from "./Profile";

type HeaderProps = {
    employee: Employee,
    onLogout?: () => void;
}

const Header = memo(function Header({ employee, onLogout }: HeaderProps) {
    const navigate = useNavigate();

    const profileModalRef = useRef<HTMLDialogElement>(null);

    function handleLogout() {
        onLogout?.();
        navigate('/login');
    }

    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <h1 className="text-2xl font-bold">George Company</h1>
            </div>
            <div className="navbar bg-gray-800 text-white shadow-sm">
                <div className="flex-1">
                    <button onClick={() => navigate('/')} className="btn btn-ghost normal-case text-xl">
                        <Icon path={mdiHome} size={1} />
                    </button>
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <button className="justify-between" onClick={() => profileModalRef.current?.showModal()}>
                            Profile
                            {/* <span className="badge">New</span> */}
                        </button>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button type="button" onClick={handleLogout}>Logout</button></li>
                    </ul>
                    </div>
                </div>
            </div>
            <Profile employee={employee} ref={profileModalRef}/>
        </header>
    );
});

export default Header;
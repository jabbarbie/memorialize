import { useState, PropsWithChildren, ReactNode, useEffect, Fragment } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import '../../sass/app.scss';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'moment/locale/id';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const dayList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const monthList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

export default function Authenticated({ user, header, children, aside, otherMenu }: PropsWithChildren<{ user: User, header?: ReactNode, aside?: ReactNode, otherMenu?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        moment.locale('id');
        const intervalId = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, []);


    const fullTime = (dayList[moment().day()]) + ", " + (moment().date()) + " " + (monthList[(moment().month())]) + " " + ' | ' + (moment(currentTime).format('HH:mm:ss'))

    return (
        <Fragment>
            <ToastContainer />

            <div id="wrapper">
                <main>
                    <div id="wrapper__main" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>

                    <div id="floating_sidebar" className={`${isOpen ? 'open' : null}`}>
                        <ul>
                            <li>
                                <a className={`${route().current('dashboard') ? 'active' : null}`} href="/">Dashboard</a>
                            </li>
                            <li>
                                <a className={`${route().current('projects.*') ? 'active' : null}`} href="/projects">Project</a>
                            </li>
                            {/* <li>
                                <a className={`${route().current('scrums.*') ? 'active' : null}`} href="/scrum">Scrum</a>
                            </li> */}

                            <li>
                                <a className={`${route().current('notes.*') ? 'active' : null}`} href="/notes">Notes</a>
                            </li>
                        </ul>
                        {aside}
                    </div>

                </main>
                <aside>
                    {aside}
                </aside>
                <footer>
                    <nav>
                        <ul className='menu__desktop'>
                            <li><a href="/" className={`${route().current('dashboard') ? 'active' : null}`}>D</a></li>
                            <li>
                                <a href="/projects" className={`${route().current('projects.*') ? 'active' : null}`}>P</a>
                            </li>
                            <li><a href="/notes" className={`${route().current('notes.*') ? 'active' : null}`}>N</a></li>
                            {/* <li><a href="">Task</a></li> */}
                            <li><a href="">S</a></li>
                        </ul>
                        <ul className='menu__mobile'>
                            {route().current('projects.index') && <li><a href='/projects/create'>+</a></li>}
                            {otherMenu}
                            <li><a href="" >{fullTime}</a></li>
                            <li>
                                <div
                                    className={`burger-menu ${isOpen ? 'open' : ''}`}
                                    onClick={toggleMenu}
                                >
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </footer>
            </div >
        </Fragment >
    )
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

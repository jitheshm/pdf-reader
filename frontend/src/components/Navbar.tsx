import { useState } from 'react';
import instance from '../axios';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignout = () => {
        instance.post('/api/user/logout', {}).then(() => {
            dispatch(logout())
            navigate('/login')
        }).catch((err) => {
            console.log(err);

        })
    }

    return (
        <div>


            <nav className="bg-gray-800 fixed w-full">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>

                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="relative flex rounded-full text-white bg-gray-800 text-sm focus:outline-none hover:text-gray-300"
                                        id="user-menu-button"
                                        aria-expanded={userMenuOpen}
                                        aria-haspopup="true"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        User
                                    </button>
                                </div>

                                <div className={`${userMenuOpen ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>

                                    <button onClick={handleSignout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </nav>
            <div className='h-16 '>

            </div>
        </div>

    );
}

export default Navbar;

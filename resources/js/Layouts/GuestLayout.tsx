import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import '../../sass/guest.scss';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div id="guest">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <main>
                {children}
            </main>
        </div>
    );
}

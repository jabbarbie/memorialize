import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import '../../sass/home.scss'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Bounce, Flip, ToastContainer, toast } from 'react-toastify';
import { formatText } from '@/helper';


interface Note {
    id: number
    name: string
    updated_at: string
    is_done: boolean
}

interface MainProps {
    auth: {
        user: User
    }
    note: Note
}

export default function Dashboard({ auth, note }: MainProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useState(note.name);
    const [changed, setChanged] = useState<boolean>(false)
    const [preview, setPreview] = useState<boolean>(true)

    const [typedCount, setTypedCount] = useState<number>(0)
    const [lastWord, setLastWord] = useState<string>("")

    const handleChange = (e: any) => {
        setTypedCount((_old) => _old + 1)
        setChanged(true)
        setContent(e.target.value);
    };

    useEffect(() => {
        console.log("lastWord", lastWord)
        if (lastWord == "Escape") {
            setPreview(true)
            handleBlur()
        }

        if (lastWord == "Enter") {
            setPreview(false)
        }
    }, [lastWord])

    const globalHandleKeyDown = (event: any) => {
        if (event.key === 'Escape') {
            setLastWord("Escape")
        }

        if (event.key === 'Enter') {
            setLastWord("Enter")
        }
    };

    const lastLine = () => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.focus();

            textareaRef.current.selectionStart = textareaRef.current.value.length;
            textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }

    }

    useEffect(() => {
        // setTypedCount(0)
        if (!preview) {
            lastLine()
        }
    }, [preview]);

    useEffect(() => {
        window.addEventListener('keydown', globalHandleKeyDown);

        return () => {
            window.removeEventListener('keydown', globalHandleKeyDown);
        };
    }, []);

    const handleBlur = () => {
        if (changed) {
            const payload = {
                note: note.id,
                name: content,
            };
            axios.post(`/${note.id}/store_note`, payload).then((d) => {
                toast.success('Saved', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: 0,
                    theme: "dark",
                    transition: Flip,
                });

                setChanged(false)
                // setPreview(true)
            })
        }

    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div id="home__wrapper">
                <nav className="home__nav d-none">
                    <ul>
                        <li><a>D</a></li>
                        <li><a>P</a></li>
                        <li><a>S</a></li>
                        <li><a>N</a></li>
                    </ul>
                </nav>
                <div className="home__aside">
                    <div className="link__title">
                        <h3>Scrum</h3>
                    </div>

                    <div className="link__group">
                        <p>Prefix</p>
                        <p>Saya hari ini :</p>
                    </div>
                    <div className="link__group_row" style={{ display: 'none' }}>
                        <p>Project hari ini</p>
                        <ul>
                            <li>Lorem</li>
                            <li>Ipsum</li>
                            <li>Tralala</li>
                        </ul>
                    </div>
                    <button>Send To Whatsapp</button>
                </div>
                <div className='home__main'>
                    {preview ?
                        <div id="display" className='textarea__preview' >
                            {formatText(content)}
                        </div> :
                        <textarea
                            ref={textareaRef}
                            className=''
                            // rows={30}
                            spellCheck="false"
                            value={content}
                            autoFocus={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    }

                </div>
            </div>

        </AuthenticatedLayout>
    );
}

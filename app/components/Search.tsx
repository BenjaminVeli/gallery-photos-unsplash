import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Search = () => {
    const [name, setName] = useState('')
    
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        navigate(`/photos/${name}`);
    };

    return (
    <header className="fixed z-50 w-full bg-white">
        <div className="container-header">
            <div className="py-2 sm:py-3">
                <div className="flex items-center gap-6">
                    <Link to="/" title="Inicio">
                        <img src="/unplash.png" alt="Unsplash" className="h-8 w-8"/>
                    </Link>
                    <form className="flex-1" onSubmit={handleSubmit}>
                        <div className="relative flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search photos and illustrations" 
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                                Search
                            </button> 
                        </div>
                    </form>
                    <a className="hidden md:flex" href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer">
                        <span className="text-black text-[16px] whitespace-nowrap">Unsplash API</span>
                    </a>
                    <a className="hidden md:flex" href="https://github.com/BenjaminVeli/gallery-photos-unsplash" target="_blank" rel="noopener noreferrer">
                        <span className="text-gray-500 text-[16px]">Repositorio</span>
                    </a>
                    <a className="" href="https://github.com/BenjaminVeli" target="_blank" rel="noopener noreferrer">
                        <img src="/github.png" alt="Unsplash" className="h-8 w-8"/>
                    </a>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Search
import { Link } from "react-router-dom"

export function NavBar(){
    return(
        <nav className="w-full h-36 bg-cyan-800 flex items-center justify-around">
            <Logo />

            <NavLinks />
        </nav>
    )
}

function Logo(){
    return(
        <div className="flex items-center gap-3">
            <img src="/smart_sales_logo.png" width={90} height={90} className="rounded-full" />
            <h1 className="text-white text-4xl font-semibold">Smart Sales</h1>
        </div>
    )
}


function NavLinks(){

    const list = [
        { name: "Home", to: "/smartsales/analysis" },
        { name: "Graphs", to: "/smartsales/graphs" },
        { name: "Contact Us", to: "/smartsales/contactUs" },
    ]
    return(
        <ul className="flex gap-16 text-white text-xl font-semibold">
            {
                list.map((item, index) => (
                    <Link
                        key={index}  
                        to={item.to}
                        replace={true}
                        className="hover:opacity-75"
                    >

                        {item.name}

                    </Link>
                ))
            }
        </ul>
    )
}
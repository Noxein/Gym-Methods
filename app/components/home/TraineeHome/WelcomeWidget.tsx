function WelcomeWidget({name}:{name:string}) {
    return ( 
        <div className="w-full flex flex-col pl-5 mt-4 text-white">
            <h1 className="text-2xl font-bold">Witaj {`, ${name}`}!</h1>
        </div>
     );
}

export default WelcomeWidget;
function AccesCode({trainerCode}: {trainerCode: string | string[]}) {

    const newCode = typeof trainerCode === 'string' ? trainerCode : trainerCode.join('');
    return ( 
        <div className="flex justify-between gap-4">
            {newCode.split('').map((codeChar,idx)=>(
                <div key={idx} className="border p-2 flex-1 rounded border-notSelected text-2xl text-center font-mono shadow-md shadow-black">{codeChar}</div>
            ))}
        </div>
     );
}

export default AccesCode;
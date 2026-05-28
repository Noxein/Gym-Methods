function StudentAvatar({ info }: { info: { avatarurl?: string } }) {
    return ( 
        <img src={info.avatarurl ||"/avatar-default.png"} alt="Zdjęcie profilowe" className="w-16 h-16 rounded-lg object-cover my-2 ml-2"/>
     );
}

export default StudentAvatar;
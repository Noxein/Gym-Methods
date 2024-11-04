export const SmallLoader = ({sClass,sClassParent}:{sClass?:string,sClassParent?:string}) => {
  return (
    <div className={`flex justify-center ${sClassParent}`}>
        <span className={`loader1 ${sClass}`}>

        </span>
    </div>
  )
}

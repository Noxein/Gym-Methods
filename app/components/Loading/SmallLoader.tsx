export const SmallLoader = ({loading,sClass,sClassParent}:{loading?:boolean,sClass?:string,sClassParent?:string}) => {
  return (
    loading && <div className={`flex justify-center ${sClassParent}`}>
        <span className={`loader1 ${sClass}`}>

        </span>
    </div>
  )
}

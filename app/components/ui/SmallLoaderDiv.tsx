interface SmallLoaderDiv {
    loading: boolean,
    sClass?:string,
    sClassParent?:string
}

export const SmallLoaderDiv = ({loading,sClass,sClassParent}:SmallLoaderDiv) => {
    if(!loading) return

  return (
      <div className={`flex justify-center ${sClassParent}`}>
        <span className={`loader1 ${sClass}`}>

        </span>
    </div>
  )
}

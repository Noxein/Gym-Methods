interface ListElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    elementName: string,
    childrenIcon: React.ReactNode,
}

export const ListElement = ({elementName,childrenIcon,...rest}:ListElement) => {
  return (
    <div {...rest} className='flex bg-borderInteractive p-[2px] rounded-lg text-white'>
        <button className='bg-dark flex-1 py-4 px-5 rounded-lg text-left'>
            {elementName}
        </button>
        {childrenIcon}
    </div>
  )
}

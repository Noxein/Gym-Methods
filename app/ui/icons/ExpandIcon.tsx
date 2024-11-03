import { cn } from "@/app/lib/cn"
import { SVGProps } from "react"

const iconWidth = 25
const iconHeight = 25
const iconFill = '#0D1317'

export const ExpandIcon = ({expanded,fill = '#E7E7E7'}:{expanded: boolean,fill?:string}) => {
    return(
        <svg viewBox="0 0 24 24" fill={fill}  width={iconWidth+10} height={iconHeight+10} transform={expanded?'rotate(90)':''}><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    )
}

export const ExpandIcon2 = ({expanded,fill = '#E7E7E7'}:{expanded: boolean,fill?:string}) => {
    return(
        <svg className="transition-all duration-200" viewBox="0 0 24 24" fill={fill}  width={iconWidth+10} height={iconHeight+10} transform={expanded?'rotate(90)':'rotate(270)'}><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    )
}

export const ProfileIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={width?width:iconWidth} height={height?height:iconHeight} fill={fill?fill:iconFill}>
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
    </svg>
    )
}

export const PlusIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={width?width:iconWidth} height={height?height:iconHeight} fill={fill?fill:'#d9d9d9'}>
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
        </svg>
    )
}

export const StartWorkoutIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={width?width:iconWidth} height={height?height:iconHeight} fill={fill?fill:iconFill}>
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
        </svg>
    )
}

export const SettingsIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width?width:iconWidth} height={height?height:iconHeight} strokeWidth='40' stroke={fill?fill:"#0D1317"} fill='none'>
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
        </svg>
    )
}

export const PencilIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return(
        <svg fill={fill?fill:"#0D1317"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899" stroke={fill?fill:"#0D1317"} width={width?width:iconWidth} height={height?height:iconHeight}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path> 
                </g>
            </g>
        </svg>
    )
}

export const TrashIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={fill?fill:"#0D1317"} width={width?width:iconWidth+5} height={height?height:iconHeight+5}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M10 11V17" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M14 11V17" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M4 7H20" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    )
}
export const LeftAngle = ({width,height,fill,className}:{width?:string,height?:string,fill?:string} & SVGProps<SVGSVGElement>) => {
    return (
        <svg className={cn(className)} fill={fill?fill:iconFill} width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M11.3,12l3.5-3.5c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2l0,0c-0.4,0.4-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L11.3,12z"></path>
                </g>
        </svg>
    )
}

export const RightTriangle = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return(
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M7.93189 1.24806C7.84228 1.09446 7.67783 1 7.5 1C7.32217 1 7.15772 1.09446 7.06811 1.24806L0.0681106 13.2481C-0.0220988 13.4027 -0.0227402 13.5938 0.0664289 13.749C0.155598 13.9043 0.320967 14 0.5 14H14.5C14.679 14 14.8444 13.9043 14.9336 13.749C15.0227 13.5938 15.0221 13.4027 14.9319 13.2481L7.93189 1.24806Z" fill={fill?fill:"#0D1317"}>
                </path> 
            </g>
        </svg>
    )
}

export const VerticalDots = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return(
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={fill?fill:"#0D1317"} stroke="#0D1317">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
                </path> 
            </g>
        </svg>
    )
}

export const HomeIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg fill="#D9D9D9" width={width?width:iconWidth} height={height?height:iconHeight} version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M28.7,16.3l-12-13c-0.4-0.4-1.1-0.4-1.5,0l-12,13C3,16.6,2.9,17,3.1,17.4C3.2,17.8,3.6,18,4,18h3v10c0,0.6,0.4,1,1,1h16 c0.6,0,1-0.4,1-1V18h3c0.4,0,0.8-0.2,0.9-0.6C29.1,17,29,16.6,28.7,16.3z"></path> 
            </g>
        </svg>
    )
}

export const TimerIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path> 
            </g>
        </svg>
    )
}

export const CalendarIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path> 
            </g>
        </svg>
    )
}

export const ExerciseIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="-11 0 32 32" version="1.1" fill={fill?fill:"#0D1317"} transform="rotate(45)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <title>pencil</title> 
            <desc>Created with Sketch Beta.</desc> 
            <defs> </defs> 
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> 
                <g id="Icon-Set" transform="translate(-579.000000, -99.000000)" fill={fill?fill:"#0D1317"}> 
                    <path d="M587,106 L581,106 L581,102 C580.969,101.012 581.021,100.968 582,101 L586,101 C586.98,101.007 587.004,100.967 587,102 L587,106 L587,106 Z M587,121 C584.946,120.999 581.582,121 581,121 L581,108 L587,108 L587,121 L587,121 Z M584,128.257 L581,123 L587,123 L584,128.257 L584,128.257 Z M587,99 L581,99 C579.79,99 579,99.779 579,101 L579,123.213 L583,130.275 C583.604,131.206 584.396,131.206 585,130.275 L589,123.213 L589,101 C589,99.779 588.21,99.001 587,99 L587,99 Z" id="pencil"> 
                    </path> 
                </g> 
            </g> 
        </g>
        </svg>
    )
}

export const BookIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6.1519V19.3095C3.99197 18.8639 5.40415 18.4 7 18.4C8.58915 18.4 9.9999 18.8602 11 19.3094V6.1519C10.7827 6.02653 10.4894 5.8706 10.1366 5.71427C9.31147 5.34869 8.20352 5 7 5C5.26385 5 3.74016 5.72499 3 6.1519ZM13 6.1519V19.3578C13.9977 18.9353 15.41 18.5 17 18.5C18.596 18.5 20.0095 18.9383 21 19.3578V6.1519C20.2598 5.72499 18.7362 5 17 5C15.7965 5 14.6885 5.34869 13.8634 5.71427C13.5106 5.8706 13.2173 6.02653 13 6.1519ZM12 4.41985C11.7302 4.26422 11.3734 4.07477 10.9468 3.88572C9.96631 3.45131 8.57426 3 7 3C4.69187 3 2.76233 3.97065 1.92377 4.46427C1.30779 4.82687 1 5.47706 1 6.11223V20.0239C1 20.6482 1.36945 21.1206 1.79531 21.3588C2.21653 21.5943 2.78587 21.6568 3.30241 21.3855C4.12462 20.9535 5.48348 20.4 7 20.4C8.90549 20.4 10.5523 21.273 11.1848 21.6619C11.6757 21.9637 12.2968 21.9725 12.7959 21.6853C13.4311 21.32 15.0831 20.5 17 20.5C18.5413 20.5 19.9168 21.0305 20.7371 21.4366C21.6885 21.9075 23 21.2807 23 20.0593V6.11223C23 5.47706 22.6922 4.82687 22.0762 4.46427C21.2377 3.97065 19.3081 3 17 3C15.4257 3 14.0337 3.45131 13.0532 3.88572C12.6266 4.07477 12.2698 4.26422 12 4.41985Z" fill={fill?fill:"#0D1317"}>
                </path> 
            </g>
        </svg>
    )
}

export const SummaryIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={fill?fill:"#0D1317"}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M7 14L9.29289 11.7071C9.68342 11.3166 10.3166 11.3166 10.7071 11.7071L12.2929 13.2929C12.6834 13.6834 13.3166 13.6834 13.7071 13.2929L17 10M17 10V12.5M17 10H14.5" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path> 
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round">
                </path> 
            </g>
        </svg>
    )
}

export const StarIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M14.65 8.93274L12.4852 4.30901C12.2923 3.89699 11.7077 3.897 11.5148 4.30902L9.35002 8.93274L4.45559 9.68243C4.02435 9.74848 3.84827 10.2758 4.15292 10.5888L7.71225 14.2461L6.87774 19.3749C6.80571 19.8176 7.27445 20.1487 7.66601 19.9317L12 17.5299L16.334 19.9317C16.7256 20.1487 17.1943 19.8176 17.1223 19.3749L16.2878 14.2461L19.8471 10.5888C20.1517 10.2758 19.9756 9.74848 19.5444 9.68243L14.65 8.93274Z" stroke={fill?fill:"#0D1317"} strokeWidth='2' strokeLinecap="round" strokeLinejoin="round">
                </path>
            </g>
        </svg>
    )
}


export const LockIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={fill?fill:"#0D1317"}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path>
            </g>
        </svg>
    )
}


export const LogoutIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                </path> 
            </g>
        </svg>
    )
}

export const CheckIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={fill?fill:"#0D1317"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    )
}

export const CrossIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg fill={fill?fill:"#0D1317"} width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 490 490" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> 
            </g>
        </svg>
    )
}

export const EyeIcon = ({isOpen,width,height,fill}:{isOpen:boolean,width?:string,height?:string,fill?:string}) => {
    if(isOpen){
        return(
            <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={fill?fill:"#D9D9D9"}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                    <path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#D9D9D9"></path> 
                </g>
            </svg>
        )
    }
    return(
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M4.5 15.5C7.5 9 16.5 9 19.5 15.5" stroke={fill?fill:"#D9D9D9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M16.8162 12.1825L19.5 8.5" stroke={fill?fill:"#D9D9D9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M12 10.625V7" stroke={fill?fill:"#D9D9D9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M7.18383 12.1825L4.5 8.5" stroke={fill?fill:"#D9D9D9"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    )
}
export const SpeedIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return(
        <svg width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={fill?fill:"#D9D9D9"}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <path d="M6.6967 17.3033C5.64781 16.2544 4.9335 14.918 4.64411 13.4632C4.35472 12.0083 4.50325 10.5003 5.0709 9.12987C5.63856 7.75943 6.59985 6.58809 7.83322 5.76398C9.06659 4.93987 10.5166 4.5 12 4.5C13.4834 4.5 14.9334 4.93987 16.1668 5.76398C17.4001 6.58809 18.3614 7.75943 18.9291 9.12987C19.4968 10.5003 19.6453 12.0083 19.3559 13.4632C19.0665 14.918 18.3522 16.2544 17.3033 17.3033" stroke={fill?fill:"#D9D9D9"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path> 
                <path d="M12 12L16 10" stroke={fill?fill:"#D9D9D9"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g>
        </svg>
    )
}

export const HandleIcon = ({width,height,fill}:{width?:string,height?:string,fill?:string}) => {
    return (
        <svg fill={fill?fill:"#0D1317"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width={width?width:iconWidth} height={height?height:iconHeight} viewBox="0 0 193.556 193.556" xmlSpace="preserve">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
                <g> 
                    <path d="M154.455,50.399v31.177c0,5.17-4.184,9.353-9.354,9.353s-9.353-4.183-9.353-9.353V50.399 c0-17.479-17.488-31.694-38.971-31.694c-21.486,0-38.971,14.215-38.971,31.694v31.177c0,5.17-4.184,9.353-9.353,9.353 s-9.353-4.183-9.353-9.353V50.399C39.101,22.609,64.977,0,96.778,0C128.587,0,154.455,22.609,154.455,50.399z M121.719,56.896 c-3.647,0-6.771,2.107-8.312,5.158c-1.54-3.051-4.67-5.158-8.312-5.158c-3.641,0-6.771,2.107-8.312,5.158 c-1.541-3.051-4.67-5.158-8.312-5.158c-3.642,0-6.771,2.107-8.312,5.158c-1.541-3.051-4.67-5.158-8.312-5.158 c-5.169,0-9.353,4.184-9.353,9.354v16.105c0,5.17,4.184,9.353,9.353,9.353c3.647,0,6.771-2.107,8.312-5.158 c1.541,3.051,4.67,5.158,8.312,5.158c3.641,0,6.771-2.107,8.312-5.158c1.541,3.051,4.671,5.158,8.312,5.158 c3.642,0,6.771-2.107,8.312-5.158c1.541,3.051,4.671,5.158,8.312,5.158c5.169,0,9.353-4.183,9.353-9.353V66.25 C131.072,61.08,126.888,56.896,121.719,56.896z M96.778,101.841c-31.807,0-57.677,22.609-57.677,50.399v31.177 c0,5.17,4.184,9.354,9.353,9.354s9.353-4.184,9.353-9.354V152.24c0-17.476,17.485-31.693,38.971-31.693 c21.482,0,38.971,14.218,38.971,31.693v31.177c0,5.17,4.183,9.354,9.353,9.354s9.354-4.184,9.354-9.354V152.24 C154.455,124.45,128.587,101.841,96.778,101.841z M121.719,158.744c-3.647,0-6.771,2.106-8.312,5.157 c-1.54-3.051-4.67-5.157-8.312-5.157c-3.641,0-6.771,2.106-8.312,5.157c-1.541-3.051-4.67-5.157-8.312-5.157 c-3.642,0-6.771,2.106-8.312,5.157c-1.541-3.051-4.67-5.157-8.312-5.157c-5.169,0-9.353,4.184-9.353,9.353v16.106 c0,5.17,4.184,9.353,9.353,9.353c3.647,0,6.771-2.106,8.312-5.157c1.541,3.051,4.67,5.157,8.312,5.157 c3.641,0,6.771-2.106,8.312-5.157c1.541,3.051,4.671,5.157,8.312,5.157c3.642,0,6.771-2.106,8.312-5.157 c1.541,3.051,4.671,5.157,8.312,5.157c5.169,0,9.353-4.183,9.353-9.353v-16.106C131.072,162.921,126.888,158.744,121.719,158.744z">
                    </path> 
                </g> 
            </g>
        </svg>
    )
}
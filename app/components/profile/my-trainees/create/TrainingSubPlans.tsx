'use client'
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useContext, useEffect, useRef, useState } from "react";
import AddPlanButton from "./AddPlanButton";
import SingleTrainingInfo from "./SingleTrainingInfo";

function TrainingSubPlans() {
    const { plan } = useContext(CreateTrainingContext)! 
    const [focusedPlanIndex, setFocusedPlanIndex] = useState(0)
    const planRefs = useRef<Array<HTMLDivElement | null>>([])
    const hasPlans = plan.plan.length > 0

    useEffect(() => {
       if(!hasPlans) {
           setFocusedPlanIndex(0)
           planRefs.current = []
           return;
       }

       planRefs.current = planRefs.current.slice(0, plan.plan.length)
       let frameId = 0

       const updateFocusedPlan = () => {
           const viewportCenter = window.innerHeight / 2
           let nextFocusedPlanIndex = 0
           let closestDistance = Number.POSITIVE_INFINITY

           planRefs.current.forEach((element, index) => {
               if(!element) return;

               const rect = element.getBoundingClientRect()
               const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight
               const cardCenter = rect.top + rect.height / 2
               const distanceFromCenter = Math.abs(cardCenter - viewportCenter)

               if((isVisible || closestDistance === Number.POSITIVE_INFINITY) && distanceFromCenter < closestDistance) {
                   closestDistance = distanceFromCenter
                   nextFocusedPlanIndex = index
               }
           })

           setFocusedPlanIndex((previousIndex) => previousIndex === nextFocusedPlanIndex ? previousIndex : nextFocusedPlanIndex)
       }

       const requestFocusedPlanUpdate = () => {
           cancelAnimationFrame(frameId)
           frameId = window.requestAnimationFrame(updateFocusedPlan)
       }

       requestFocusedPlanUpdate()
       window.addEventListener('scroll', requestFocusedPlanUpdate, { passive: true })
       window.addEventListener('resize', requestFocusedPlanUpdate)

       return () => {
           cancelAnimationFrame(frameId)
           window.removeEventListener('scroll', requestFocusedPlanUpdate)
           window.removeEventListener('resize', requestFocusedPlanUpdate)
       }
    }, [hasPlans, plan.plan.length])

    return ( 
       <div className="mt-5 mb-44">
           {hasPlans ? <div className="pointer-events-none h-[18vh]" aria-hidden="true" /> : null}

           <div className="flex flex-col gap-5">
           {plan.plan.map((subPlan, index) => (
               <div
                   key={subPlan.id}
                   ref={(element) => {
                       planRefs.current[index] = element
                   }}
                   className="transition-transform duration-300"
               >
                   <SingleTrainingInfo plan={subPlan} planIndex={index} isFocused={index === focusedPlanIndex}/>
               </div>
           ))}
           </div>

           {hasPlans ? <div className="pointer-events-none h-[24vh]" aria-hidden="true" /> : null}

           <AddPlanButton />
       </div>
     );
}

export default TrainingSubPlans;
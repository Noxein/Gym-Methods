type GoalItem = {
    id: string
    userid: string
    exerciseid: string
    exercisename: string
    goal: string
}

type GoalsPageProps = {
    title: string
    emptyMessage: string
    exerciseLabel: string
    goalLabel: string
    goals: GoalItem[]
}

export const GoalsPage = ({ title, emptyMessage, exerciseLabel, goalLabel, goals }: GoalsPageProps) => {
    return (
        <main className="mx-5 mt-20 flex flex-col gap-4 text-white">
            <p className="text-center text-3xl">{title}</p>
            <div className="overflow-hidden rounded-lg bg-darkLight">
                {goals.length === 0 ? (
                    <p className="p-5 text-center text-gray-300">{emptyMessage}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-borderInteractive text-sm uppercase tracking-wide text-gray-400">
                                    <th className="px-4 py-3">{exerciseLabel}</th>
                                    <th className="px-4 py-3 text-right">{goalLabel}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goals.map((goal) => (
                                    <tr key={goal.id} className="border-b border-white/5 last:border-b-0">
                                        <td className="px-4 py-3">{goal.exercisename}</td>
                                        <td className="px-4 py-3 text-right font-medium">{goal.goal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    )
}
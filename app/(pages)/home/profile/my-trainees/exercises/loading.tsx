export default function Loading() {
    return (
        <div className='min-h-screen bg-dark p-6 mb-20'>
            <div className='max-w-7xl mx-auto'>
                <div className='h-8 bg-dark-lighter rounded-lg mb-8 w-48 animate-pulse'></div>
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-1'>
                        <div className='space-y-4'>
                            <div className='h-6 bg-dark-lighter rounded-lg w-32 animate-pulse'></div>
                            <div className='space-y-3'>
                                <div className='h-12 bg-dark-lighter rounded-lg animate-pulse'></div>
                                <div className='h-24 bg-dark-lighter rounded-lg animate-pulse'></div>
                                <div className='h-12 bg-dark-lighter rounded-lg animate-pulse'></div>
                                <div className='h-10 bg-dark-lighter rounded-lg animate-pulse'></div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-2'>
                        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className='bg-dark-lighter rounded-lg p-4 h-32 animate-pulse'></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

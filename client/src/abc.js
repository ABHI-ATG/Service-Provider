import React from 'react'

export const abc = () => {
    return (
        <div className=' h-screen my-7 p-8'>
            <div className="w-full border flex flex-col">
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            <img className="w-10 h-10 rounded-full" src="./icons/Default.png" />
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">
                                Provider Name
                            </p>
                            <p className="text-grey-darker text-xs mt-1">
                                cityname , Profession
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex-1 overflow-auto bg-[#DAD3CC]">
                    <div className="py-2 px-3">
                        <div className="flex justify-center mb-4">
                            <div className="rounded py-2 px-4 bg-[#FCF4CB]">
                                <p className="text-xs">
                                    Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                </p>
                            </div>
                        </div>


                        <div className="flex mb-2">
                            <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                                <p className="text-sm mt-1">
                                    He is. Just invited him to join.
                                </p>
                            </div>
                        </div>



                        <div className="flex justify-end mb-2">
                            <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                                <p className="text-sm mt-1">
                                    Hi guys.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end mb-2">
                            <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                                <p className="text-sm mt-1">
                                    Count me in
                                </p>
                            </div>
                        </div>


                        <div className="flex mb-2">
                            <div className="rounded py-2 px-3 bg-[#F2F2F2]">
                                <p className="text-sm mt-1">
                                    Get Andrés on this movie ASAP!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-grey-lighter px-4 py-4 flex items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                    </div>
                    <div className="flex-1 mx-4">
                        <input className="w-full border rounded px-2 py-2" value={content} type="text" placeholder='Type...' onChange={(e) => setContent(e.target.value)} />
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: "send", payload: {
                                        id: chat.provider._id,
                                        chatId: chat._id,
                                        sender: 1,
                                        content: content,
                                    }
                                })
                                setContent("")
                            }}><img className=' w-6 ' src='./icons/send.png' /></button>

                    </div>
                </div>
            </div>
        </div>
    )
}

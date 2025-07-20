import { FiSearch, FiEdit, FiMessageSquare, FiSettings, FiFileText } from 'react-icons/fi';


interface SideBarProps {
    chat_names: string[];
}


export default function SideBar( { chat_names }: SideBarProps ) {
    return (
        <div className="text-white flex flex-col h-screen w-64 bg-[#181818] p-1 px-4 ">
            <div className='my-4 flex items-center justify-between'>
                <FiSettings size={20} />
                <FiFileText size={20} />
            </div>
            <button className="rounded-lg cursor-pointer w-full hover:bg-[#303030] p-1 flex items-center">
                <FiEdit className="mr-2"/>New Chat</button>
            <button className="rounded-lg cursor-pointer w-full hover:bg-[#303030] p-1 flex items-center">
                <FiSearch className="mr-2"/>Search chats</button>
            <button className="rounded-lg cursor-pointer w-full hover:bg-[#303030] p-1 flex items-center">
                <FiMessageSquare className="mr-2"/>Check Messages</button>
            <div className='chat-list flex flex-col mt-10'>
                <h4 className='text-[#5b5b5b]'>Chats</h4>
                {chat_names.map((names) => (
                    <button className="rounded-lg cursor-pointer w-full hover:bg-[#303030] p-1 flex items-center">
                        {names}</button>
                ))}
            </div>

        </div>
    )

}
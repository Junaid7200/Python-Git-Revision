import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface NavBarProps {
    user_initials: string;
}

export default function Navbar( {user_initials}: NavBarProps) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between w-full h-16 bg-[#212121]">
            <div className="relative flex justify-between items-center text-white pl-4 h-10">
                <button className="h-full p-2 flex items-center rounded-lg cursor-pointer hover:bg-[#676767]" onClick={() => setIsOpen(!isOpen)}>
                    ChatGPT <FiChevronDown className="ml-[4px]"/>
                </button>
                {isOpen ? (
                    <div className="absolute bg-[#353535] rounded-lg top-full left-0 ml-4 w-80">
                        <div className="hover:bg-[#676767] m-2 p-2 flex items-center justify-between gap-4 hover:rounded-lg">
                            <div className="left-0">
                                <h5>ChatGPT Plus</h5>
                                <p>Our most advanced model</p>
                            </div>
                            <div>
                                <button className="border border-white rounded-2xl px-2 py-1 bg-gray-600">Upgrade</button>
                            </div>
                        </div>
                        <div className="left-0 hover:bg-[#676767] m-2 p-2 flex items-center justify-between hover:rounded-lg">
                            <div>
                                <h5>ChatGPT</h5>
                                <p>Great for everyday tasks</p>
                            </div>
                            <div>
                                <FiCheck/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="text-white flex">
                <button className="px-2 py-1 rounded-2xl bg-[#373669]">
                    Get Plus
                </button>
            </div>
            <div className="profile-div font-sm text-white flex-end user-profile">
                <button className="bg-[#2980b9] rounded-full mr-2 p-2 w-8 h-8 flex items-center justify-center">{user_initials}</button>
            </div>
        </div>
    )
}
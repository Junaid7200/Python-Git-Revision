import SideBar from '@/components/sidebar';
import Navbar  from '@/components/navbar';

export default function ChatBotPage() {
  return (
        <div className="bg-[#212121] flex min-h-screen">
      <SideBar chat_names={["Chat 1", "Chat 2", "Chat 3"]}/>
      <div className='flex flex-col w-full h-screen'>
        <Navbar user_initials={"AB"}/>

        <div className='flex-grow'></div>

        <div className='flex justify-center mb-4 textArea-div text-white'>
          <textarea name="chatArea" className='p-4 bg-[#353535] rounded-2xl w-1/3 h-full'></textarea>
        </div>
      </div>
    </div>

)}
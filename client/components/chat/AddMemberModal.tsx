import React from "react";

interface AddMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  users: any[];
  fetchConversations: () => void;
}

const AddMemberModal = ({open,setOpen,selectedConversation,users,fetchConversations} : AddMemberModalProps) => {
    if(!open) return null;
    const availableUsers = users.filter((user)=>{
      return !selectedConversation.participants.some((member : any)=> member._id === user._id)
    })
    const handelAddMember = async(usersId : string)=>{
      
    }
  return (
    <div>
        <div className="bg-white p-5 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Add Members</h2>
            {
              availableUsers.map((user : any)=>(
                <div key={user._id}>
                  <button onClick={()=>handelAddMember(user._id)}>{user.name}</button>
                </div>
              ))
            }
            <button onClick={()=>setOpen(false)}>Close</button>
        </div>
    </div>
  );
};

export default AddMemberModal;

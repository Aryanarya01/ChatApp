import React from "react";
interface RemoveMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: any;
  fetchConversations: () => void;
}

const RemoveMemberModal = ({
  open,
  setOpen,
  selectedConversation,
  fetchConversations,
}: RemoveMemberModalProps) => {

  if(!open) return null;
  const handelRemoveMember = async(userId : string)=>{
    try{

    }catch(err){
      console.log(err)
    }
  }
  return(
     
    <div>
      <div>
        <h2>Remove Member</h2>
        {
          selectedConversation.participants.map((user : any)=>(
            <div key={user._id}>
               <button onClick={()=> handelRemoveMember(user._id)}>{user.name}</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RemoveMemberModal;

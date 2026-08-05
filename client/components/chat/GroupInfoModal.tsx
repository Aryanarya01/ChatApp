import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import RemoveMemberModal from "./RemoveMemberModal";
import clientServer from "@/lib/axios";

interface GroupInfoModalProp {
  selectedConversation: any;
  me: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: any[];
  fetchConversations: () => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
  setSelectedConversation: React.Dispatch<React.SetStateAction<any>>;
}
const GroupInfoModal = ({
  selectedConversation,
  me,
  open,
  setOpen,
  users,
  fetchConversations,
  setSelectedUser,
  setSelectedConversation,
}: GroupInfoModalProp) => {
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openRemoveMember, setOpenRemoveMember] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [groupName, setGroupName] = useState(selectedConversation.groupName);

  if (!open) {
    return null;
  }
  const AdminId =
    selectedConversation.groupAdmin?._id || selectedConversation.groupAdmin;

  const isAdmin = AdminId.toString() === me._id.toString();
    
  const handleLeaveGroup = async () => {
    try {
      const { data } = await clientServer.patch(
        "/conversation/group/leave-group",
        {
          conversationId: selectedConversation._id,
        },
      );
      console.log(data);
      await fetchConversations();

      setSelectedConversation(null),
       setSelectedUser(null),
        setOpen(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRenameGroup = async()=>{
    try{
      const {data} = await clientServer.patch("/conversation/group/rename",{
        conversationId : selectedConversation._id,
        groupName
      });
      console.log(data);
      setGroupName(data.groupName)
       await fetchConversations()
      setEditingName(false)
      
    }catch(err:any){
      console.log(err)
    }
  }
  console.log("sc",selectedConversation)
  console.log("AdminId:", AdminId);
  console.log("Me:", me._id);
  console.log("isAdmin:", isAdmin);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        {/* header */}
        <div>
          <h2>Group Info</h2>
          <button>✕</button>
        </div>

        {/* image */}
        <img src="" alt="" />

        {editingName ? (
          <> 
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={handleRenameGroup}>Save</button>
          </>
        ) : (
           <>
           <h2>{groupName}</h2>
           <button onClick={()=>setEditingName(true)}>Rename</button>
           </>
        )}
        
        <h3>Members</h3>
        {selectedConversation.participants.map((user: any) => (
          <div key={user._id}>
            {user.name}
            {AdminId.toString() === user._id.toString() && <span>(Admin)</span>}
          </div>
        ))}

        {isAdmin && (
          <>
            <button onClick={() => setOpenAddMember(true)}>Add Member</button>
            <button onClick={() => setOpenRemoveMember(true)}>
              Remove Member
            </button>
          </>
        )}

        <button onClick={handleLeaveGroup}>Leave Group</button>
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
      <AddMemberModal
        open={openAddMember}
        setOpen={setOpenAddMember}
        selectedConversation={selectedConversation}
        users={users}
        fetchConversations={fetchConversations}
      />
      <RemoveMemberModal
        open={openRemoveMember}
        setOpen={setOpenRemoveMember}
        selectedConversation={selectedConversation}
        fetchConversations={fetchConversations}
      />
    </div>
  );
};

export default GroupInfoModal;

import React, { useState } from "react";

interface ProfileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  me: any;
}

const ProfileModal = ({ me, open, setOpen }: ProfileModalProps) => {
  const [image, setImage] = useState<File | null>(null);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h2>My Profile</h2>
        <img
          src={me?.profilePicture || "/avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />
        <input type="file" accept="image/*" onChange={(e)=>{
          if(e.target.files){
            setImage(e.target.files[0])
          }
        }}/>
        <h3 className="text-center mt-3 font-semibold">{me?.name}</h3>
        <p className="text-center text-gray-500">{me?.email}</p>
        <button className="mt-5 w-full bg-red-500 text-white p-2 rounded" onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;

import clientServer from "@/lib/axios";
import React, { useState } from "react";

interface ProfileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  me: any;
  setMe : any
}

const ProfileModal = ({ me, open, setOpen,setMe }: ProfileModalProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleUploadImage = async () => {
    try {
      if (!image) return;
      const formdata = new FormData();
      formdata.append("image", image!);
      const { data } = await clientServer.patch(
        "/auth/profile-picture",
        formdata,
        
      );
      console.log(data);
        // Update the UI
    setMe(data.user);

    // Close the modal
    setOpen(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className=" relative w-[430px] rounded-[30px] border border-cyan-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.45)] ">
        <button className="absolute top-5 right-5 text-slate-400 hover:text-white text-2xl transition" onClick={()=>setOpen(false)}>✕</button>
        <h2>My Profile</h2>
        <p>Manage your Zen profile</p>
{/* profile */}
        <div>
          <img
            src={me?.profilePicture || "/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
            <h3 className="text-center mt-3 font-semibold">{me?.name}</h3>
        <p className="text-center text-gray-500">{me?.email}</p>
        </div>
        {/* upload */}
        <div> 
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <button className="bg-green-500" onClick={handleUploadImage}>Upload New Picture</button>
       </div>
       {/* divider */}
       <div></div>
       {/* close btn */}
        <button
          className="mt-5 w-full bg-red-500 text-white p-2 rounded"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;

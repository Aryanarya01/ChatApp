import clientServer from "@/lib/axios";
import React, { useState } from "react";

interface ProfileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  me: any;
  setMe: any;
}

const ProfileModal = ({ me, open, setOpen, setMe }: ProfileModalProps) => {
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

  const handleLogout = async()=>{
    try{

    }catch(err:any){
      console.log(err)
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className=" relative w-[430px] rounded-[30px] border border-cyan-400/20 bg-[#08131F]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.45)] ">
        <button
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-2xl transition"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <h2 className="font-bold text-center text-white text-3xl">
          My Profile
        </h2>
        <p className="text-center text-slate-400 mt-2">
          Manage your Zen profile
        </p>
        {/* profile */}
        <div className="flex flex-col items-center mt-8">
          <img
            src={me?.profilePicture || "/avatar.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover ring-4 ring-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
          />
          <h3 className="text-white text-2xl mt-5 font-semibold">{me?.name}</h3>
          <p className="text-slate-400">{me?.email}</p>
        </div>
        {/* upload */}
        <div className="mt-8">
          <input
            className="w-full text-sm text-slate-300 file:bg-cyan-500
          file:text-white
          file:border-0
          file:px-4
          file:py-2
          file:rounded-xl
          file:cursor-pointer
          file:hover:bg-cyan-400"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
          <button
            className="w-full mt-5 rounded-xl bg-gradient-to-r from-cyan-500 to to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
            onClick={handleUploadImage}
          >
            Upload New Picture
          </button>
        </div>
        {/* divider */}
        <div className="my-8 h-px bg-white/10"></div>
        {/* Logout btn */}
        <button
          className="w-full rounded-xl border border-red-400/30 bg-red-500/10 py-3 font-semibold text-red-300 transition hover:bg-red-500/20 "
          onClick={() => setOpen(false)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;

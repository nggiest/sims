import { useCallback, useEffect, useState } from "react";
import type { Profile } from "../../Services/profileService";
import profileService from "../../Services/profileService";
import useApi from "../../Hooks/useApi";
import imageStandar from "../../assets/Profile Photo.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store/store";
import { useForm } from "react-hook-form";
import { editUser } from "../Auth/Store/authSlice";
import useLogout from "../../Hooks/useLogout";

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { request } = useApi();
  const logout = useLogout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await profileService.getProfile(request);
      setProfile(res?.data ?? null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Format harus JPG / PNG");
      return;
    }
    if (file.size > 100 * 1024) {
      alert("Ukuran maksimal 100KB");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      await profileService.updateProfileImage(formData);
      await fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Gagal upload foto");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<{
    email: string;
    first_name: string;
    last_name: string;
  }>({
    mode: "onChange",
  });

  const onSubmit = async (data: {
    email: string;
    first_name: string;
    last_name: string;
  }) => {
    try {
      await dispatch(editUser(data)).unwrap();
      fetchProfile();
      alert("Edit profile berhasil");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    }
  }, [profile, reset]);
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-xl mx-auto px-4 mt-10">
      <div className=" p-6 text-center">
        <div className="relative w-24 h-24 mx-auto rounded-full border border-gray-300 overflow-hidden mb-4">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <img
            src={profile?.profile_image ?? imageStandar}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-black">
          {profile?.first_name || "User"} {profile?.last_name}
        </h2>

        <div className="space-y-4 text-left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                {...register("email", { required: true })}
                value={profile?.email || ""}
                className="w-full border rounded-lg px-4 py-2 mt-1 border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Nama</label>
              <input
                {...register("first_name", { required: "Nama Wajib Diisi" })}
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 border-gray-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Nama</label>
              <input
                {...register("last_name", { required: "Nama Wajib Diisi" })}
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 border-gray-300"
              />
            </div>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg mt-2 hover:bg-red-700 transition"
              disabled={!isValid}>
              Update Profile
            </button>
          </form>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg mt-2 hover:bg-red-700 transition"
            onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

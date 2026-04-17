import { useEffect, useState, useCallback } from "react";
import imageStandar from "../assets/Profile Photo.png";
import { EyeIcon } from "@heroicons/react/16/solid";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import profileService, { type Profile } from "../Services/profileService";
import useApi from "../Hooks/useApi";
import transactionService from "../Services/transactionService";

const TopBar = () => {
  const { request } = useApi();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [balance, setBalance] = useState<number>(0);

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

  const fetchBalance = async () => {
    try {
      const res = await transactionService.getBalance(request);

      setBalance(res?.data?.balance ?? 0);
    } catch (err) {
      console.error("Gagal ambil saldo:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-30 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6  pt-2">
        <div className="flex flex-col items-start text-center px-6.5">
          <div className="w-24 h-24 rounded-full border border-gray-400 mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={profile?.profil_image ?? imageStandar}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-black">Selamat datang,</h4>
          <h2 className="font-bold text-black">{profile?.first_name}</h2>
        </div>

        <div className="w-9/12">
          <div className="w-full h-40 bg-red-600 rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-white text-sm mb-2">Saldo Anda</h3>

            <h2 className="text-white text-2xl font-bold mb-3">
              {isHidden
                ? "Rp ••••••"
                : `Rp ${balance?.toLocaleString("id-ID")}`}
            </h2>
            <h3
              className="text-white text-sm mb-2 flex items-center gap-2 hover:text-shadow-white"
              onClick={() => setIsHidden(!isHidden)}>
              Lihat Saldo
              {isHidden ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

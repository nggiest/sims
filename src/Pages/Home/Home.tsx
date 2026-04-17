import { useCallback, useEffect, useState } from "react";
import TopBar from "../../Component/TopBar";
import useApi from "../../Hooks/useApi";
import informationService, {
  type Banner,
  type Service,
} from "../../Services/informationService";
import { CreditCardIcon } from "@heroicons/react/16/solid";
import transactionService from "../../Services/transactionService";

const Home = () => {
  const { request } = useApi();
  const [services, setServices] = useState<Service[]>([]);
  const [promos, setPromos] = useState<Banner[]>([]);
  const [payment, setPayment] = useState<string>("");
  const paymentSelected = services.find(
    (item) => item.service_code === payment,
  );
  const fetchServices = useCallback(async () => {
    try {
      const res = await informationService.getService(request);
      setServices(res?.data || []);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }
  }, [request]);

  const fetchBanner = useCallback(async () => {
    try {
      const res = await informationService.getBanner(request);
      setPromos(res?.data || []);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    }
  }, [request]);

  const paymentProcess = async () => {
    try {
      await transactionService.postTransaction(request, {
        service_code: payment,
      });
      alert("Top up berhasil!");
      setPayment("");
    } catch (err) {
      console.error(err);
      alert("Gagal top up");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  return (
    <>
      <TopBar />
      {payment === "" ? (
        <>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 px-25 py-4">
            {services.map((item) => (
              <div
                key={item.service_code}
                onClick={() => setPayment(item.service_code)}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <img
                    src={item.service_icon}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <p className="text-xs mt-2 text-center">{item.service_name}</p>
              </div>
            ))}
          </div>
          <div className="px-25 mt-6">
            <h3 className="text-sm font-semibold mb-4">
              Temukan promo menarik
            </h3>
            <div className="flex gap-4 overflow-x-auto">
              {promos.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[220px] h-[100px] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item?.banner_image}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="px-25 text-left">
          <h3 className="text-2xl font-semibold mb-6">Pembayaran</h3>
          <div className="flex items-center gap-3 mb-8">
            <img
              src={paymentSelected?.service_icon}
              className="h-6 w-6 object-contain"
              alt="icon"
            />
            <span className="font-bold text-lg">
              {paymentSelected?.service_name}
            </span>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">
                <CreditCardIcon />
              </span>
            </div>
            <input
              type="text"
              disabled
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm"
              value={paymentSelected?.service_tariff?.toLocaleString("id-ID")}
            />
          </div>

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md transition-colors"
            onClick={paymentProcess}>
            Bayar
          </button>
        </div>
      )}
    </>
  );
};

export default Home;

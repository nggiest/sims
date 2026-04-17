import { useState } from "react";
import TopBar from "../../Component/TopBar";
import transactionService from "../../Services/transactionService";
import useApi from "../../Hooks/useApi";

const TopUp = () => {
  const [amount, setAmount] = useState<string>();
  const { request } = useApi();
  const sendTopUp = async () => {
    try {
      if (!amount || Number(amount) <= 10000) {
        alert("Nominal tidak valid");
        return;
      }

      const res = await transactionService.postTopUp(request, {
        top_up_amount: amount,
      });

      console.log("Top up success:", res);

      alert("Top up berhasil!");
    } catch (err) {
      console.error(err);
      alert("Gagal top up");
    }
  };
  const buttonMoney = [
    { label: "10000", value: 10000 },
    { label: "20000", value: 20000 },
    { label: "50000", value: 50000 },
    { label: "100000", value: 100000 },
    { label: "250000", value: 250000 },
    { label: "500000", value: 500000 },
  ];
  return (
    <>
      <TopBar />
      <div className="w-full">
        <>
          <div className="text-left px-18 ">
            <h4 className="text-lg font-semibold px-4">Silahkan masukan</h4>
            <h3 className="text-2xl font-semibold px-4 mb-5">Nominal Top Up</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pt-2">
            <div className="text-left px-8 ">
              <div className="relative w-full px-5">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 pointer-events-none">
                  {/* <UserIcon className="w-5 h-5" /> */}
                  {!amount && (
                    <span className="px-6">Masukan nominal top up</span>
                  )}
                </div>

                <input
                  type="string"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border rounded-sm pl-3 pr-4 py-2 border-gray-400"
                />
              </div>
              <div className="items-center px-5 mt-4">
                <button
                  onClick={sendTopUp}
                  className="w-full h-10 bg-red-600 text-white text-semibold rounded-sm disabled:bg-gray-500"
                  disabled={!amount || Number(amount) < 10000}>
                  Bayar
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pr-45">
              {buttonMoney.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setAmount(item.value.toString())}
                  className={`w-[calc(33.333%-8px)] py-2 border rounded-lg transition ${
                    amount === item.value.toString()
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white hover:bg-gray-100"
                  }`}>
                  Rp {item.value.toLocaleString("id-ID")},00
                </button>
              ))}
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default TopUp;

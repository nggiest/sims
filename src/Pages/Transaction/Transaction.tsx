import { useEffect, useState } from "react";
import TopBar from "../../Component/TopBar";
import useApi from "../../Hooks/useApi";
import transactionService, {
  type Hystory,
} from "../../Services/transactionService";

const Transaction = () => {
  const { request } = useApi();

  const [history, setHistory] = useState<Hystory[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchHistory = async () => {
    try {
      const res = await transactionService.getTransactions(request, {
        limit,
        offset,
      });

      setHistory(res?.data?.records ?? []);
    } catch (err) {
      console.error("Gagal ambil history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [offset]);

  console.log("<<<", history);

  return (
    <>
      <TopBar />

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-left">
          <h3 className="text-2xl font-semibold mb-5">Semua Transaksi</h3>
        </div>

        <div>
          {history.map((item) => {
            const isTopUp = item.transaction_type === "TOPUP";

            return (
              <div className="border border-gray-200 rounded-small mb-2 p-4">
                <div
                  key={item.invoice_number}
                  className="flex justify-between items-center py-1 border-b last:border-b-0">
                  <div>
                    <p
                      className={`font-semibold ${
                        isTopUp ? "text-green-500" : "text-red-500"
                      }`}>
                      {isTopUp ? "+" : "-"} Rp{" "}
                      {item.total_amount.toLocaleString("id-ID")}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.created_on).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setOffset(offset + limit)}
            disabled={history.length < 5}
            className="mt-4 text-red-600 font-semibold disabled:text-gray-500">
            Show More
          </button>
        </div>
      </div>
    </>
  );
};

export default Transaction;

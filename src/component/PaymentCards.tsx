// components/PaymentCards.tsx
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { authFetch } from "../utils/authFetch";

interface PaymentCard {
  _id: string;
  type: string;
  cardNumber: string;
  balance: number;
  name: string;
}

const PaymentCards = () => {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await authFetch("https://new-shopping-api.onrender.com/pay/cards", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setCards(data.cards || []);
      } catch (error) {
        console.error("Failed to fetch payment cards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Cards</h2>
      {loading ? (
        <p>Loading cards...</p>
      ) : cards.length === 0 ? (
        <p className="text-gray-500">No saved cards</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card._id}
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-5 shadow-lg hover:scale-105 transition"
            >
              <div className="flex justify-between items-center">
                <FaCreditCard className="text-3xl" />
                <span className="text-sm uppercase">{card.type}</span>
              </div>
              <p className="mt-6 text-xl tracking-widest">
                **** **** **** {card.cardNumber.slice(-4)}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm">Card Holder</span>
                <span className="text-sm">Balance</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold">{card.name}</p>
                <p className="font-bold">₹{card.balance}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentCards;

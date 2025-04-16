"use client";
import { useState, useEffect } from "react";
import Menu from "./components/menu";
export default function Home() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchCards() {
      const res = fetch("https://tcgcsv.com/tcgplayer/68/3188/products");
      const data = await (await res).json();
      const cardData = data.results;
      const filteredCards = cardData.filter(
        (card: any) =>
          Array.isArray(card.extendedData) && card.extendedData.length > 0
      );
      const otherCards = cardData.filter(
        (card: any) =>
          Array.isArray(card.extendedData) && card.extendedData.length <= 0
      );
      const sortedCards = filteredCards.sort((a: any, b: any) => {
        const cardData = (card: { extendedData: any[] }) => {
          const num = card.extendedData.find(
            (data: any) => data.name === "Number"
          );
          return num ? num.value : "";
        };
        return cardData(a).localeCompare(cardData(b));
      });
      setCards(sortedCards);
    }
    fetchCards();
  }, []);
  console.log(cards);
  return (
    <div>
      <Menu></Menu>
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 border-2 border-red-600 gap-4 p-20 ">
        {cards.map(
          (
            card: { name: string; imageUrl: string; extendedData: any },
            idx: number
          ) => {
            return (
              <div
                key={idx}
                className="flex flex-col justity-center items-center text-center"
              >
                <div className="text-xs font-bold border-2 w-full rounded-t-2xl">
                  {card.name}
                </div>
                <div className="border-2 rounded-b-2xl bg-white">
                  <img
                    src={card.imageUrl.replace("200w.jpg", "in_1000x1000.jpg")}
                    alt={card.name}
                    width={1000}
                    className="border-2 border-black rounded-2xl hover:scale-200 hover:border-0"
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

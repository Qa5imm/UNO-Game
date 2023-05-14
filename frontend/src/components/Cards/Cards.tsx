import React, { useEffect, useState } from "react";
import { socket } from "../../socket/socketio";
import { cardMapper } from "../../utils/cardMapper";
import { cards } from "../../interfaces/interface";
import { useSelector } from "react-redux";

const Cards = (props: any) => {
  const [cards, setCards] = useState([]);
  const userId = useSelector((state: any) => state.userIdSlice.id);

  useEffect(() => {
    setCards(props.cards);
  }, [props]);

  const throwCard = (card: string) => {
    const myData = {
      id: userId,
      card: card,
    };
    socket.emit("cardThrown", myData);
  };

  socket.on("cardPicked", (myData: any) => {
    setCards(myData.cards);
  });

  return (
    <div className="right-side-container my-cards-container">
      <h1>My Cards</h1>

      <div className="my-cards-inner-container">
        {cards.length !== 0 &&
          cards?.map((card: any, index: any) => {
            return (
              <div
                className={`card ${cardMapper(card)[1]}  ${
                  cardMapper(card)[0]
                }`}
                onClick={() => throwCard(card)}
                key={index}
              >
                <span className="inner">
                  <span className="mark">
                    {cardMapper(card)[2]
                      ? cardMapper(card)[1].split("-")[1]
                      : ""}
                  </span>
                </span>
              </div>
            );
          })}
      </div>
      <h2 className="font-bold text-2xl">Click on a card to play it</h2>
    </div>
  );
};

export default Cards;

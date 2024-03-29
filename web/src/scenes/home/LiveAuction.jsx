import React, { useState, useEffect } from "react";
const flexBetween = "flex items-center justify-between";
import registerIcon from "../assets/placa1.jpeg";
import user from "../assets/usernumber.png";
import lance from "../assets/bid.png";
import { Link as RouterLink } from "react-router-dom";
import Countdown from "../util/Countdown";
import Cookies from "js-cookie";
import axios from "axios";

const LiveAuction = () => {
  const [formData, setFormData] = useState({
    name: "",
    owner: JSON.parse(Cookies.get("userData")).id,
    description: "",
    category: "",
    firstBid: "",
    endTime: "",
    photo: null,
  });

  const [auctionItems, setAuctionItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get("http://127.0.0.1:9000/itens", {
      headers: {
        "x-access-token": Cookies.get("token"),
      },
    });
    return response.data;
  };

  const fetchAuctions = async () => {
    const response = await axios.get("http://127.0.0.1:8000/Leilao/", {
      headers: {
        "x-access-token": Cookies.get("token"),
      },
    });
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, auctionsData] = await Promise.all([
          fetchItems(),
          fetchAuctions(),
        ]);

        // Mapear e combinar itemsData e auctionsData
        const combinedData = itemsData.map((item) => {
          const auction = auctionsData.find(
            (auction) => auction.itemID === item.id
          );
          return { ...item, ...auction };
        });
        console.log(auctionsData);
        setAuctionItems(combinedData);
      } catch (error) {
        console.error("Erro ao buscar dados dos servidores:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval((time) => {
      const timetoend = new Countdown(time);
      setSeconds(
        (seconds) =>
          (seconds =
            timetoend.total.hours +
            " Horas " +
            timetoend.total.minutes +
            " Minutos " +
            timetoend.total.seconds +
            " Segundos")
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className=" sm:py-16">
        <div className="mx-auto max-w-6xl  px-6 lg:px-8">
          <h2 className=" text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
            Leilões Ativos
          </h2>
          <div className="mx-auto  grid  gap-y-10 gap-x-8 border-t border-gray-200 pt-10  grid-cols-3 ">
            {auctionItems.map((auctionItem) => (
              <RouterLink
                key={auctionItem.id}
                to={`/detailed/${auctionItem.id}`}
                style={{ textDecoration: "none" }}
                class=""
              >
                <article className=" p-4 flex flex-col  rounded-md shadow-xl hover:shadow-2xl">
                  <img className="w-full" src={auctionItem.photo} />
                  <div className="group relative pt-3 w-full">
                    <div>
                      <time className="text-gray-600">
                        Inicio: {formatDate(auctionItem.registration_date)}
                      </time>
                      <a
                        href="#"
                        className="  rounded-full bg-gray-200 m-2 px-3 font-medium text-gray-600  hover:bg-gray-100"
                      >
                        {auctionItem.category}
                      </a>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-bg-gray-900 ">
                      {auctionItem.name}
                    </h3>

                    <div className="mt-4">
                    <h2>Fim do leilão:</h2>
                    <time className=" text-lg font-bold">
                      
                         {formatDate(auctionItem.endTime)}
                      </time>
                    </div>
                  </div>
                  <div className="flex pt-3  space-x-2 mt-4">
                    <img className="w-10 " src={`${lance}`} />
                    <h3 className=" text-md font-bold text-bg-gray-900 mt-4 ">
                      R${auctionItem.actualBid}
                    </h3>
                  </div>
                </article>
              </RouterLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuction;

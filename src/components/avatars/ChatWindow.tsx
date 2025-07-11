import { useEffect, useState } from "react";
import { X } from "lucide-react";

const avatarKnowledgeBase: Record<string, string> = {
  antonio: "Responde como Antonio, jubilado que conoce bien las ventajas de vivir en hoteles con Hotel-Living.",
  luisa: "Responde como Luisa, también jubilada, con experiencia en estancias largas y tranquilidad.",
  john: "Responde como John, nómada digital que trabaja online y prefiere hoteles por comodidad y conexión.",
  auxi: "Responde como Auxi, alma libre que viaja por el mundo y ha vivido muchas experiencias hoteleras.",
  juan: "Responde como Juan, que solía usar AirBnB pero ahora prefiere Hotel-Living.",
  ion: "Responde como Ion, exinquilino que encontró estabilidad y flexibilidad en hoteles.",
  maria: "Responde como María, que vivía a las afueras y ahora disfruta de vivir en el centro en un hotel.",
  martin: "Responde como Martin, hotelero con experiencia en cómo funciona Hotel-Living para propietarios."
};

interface ChatWindowProps {
  activeAvatar: string;
  onClose: () => void;
}

export default function ChatWindow({ activeAvatar, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState([
    { from: "avatar", text: "¿Sobre qué quieres que hablemos?" }
  ]);
  const [input, setInput] = useState("");
  const persona = avatarKnowledgeBase[activeAvatar] || "Responde como un experto en Hotel-Living.";

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const response = `(${activeAvatar.toUpperCase()}) ${persona} Tú preguntaste: "${userMessage}".`;
      setMessages((prev) => [...prev, { from: "avatar", text: response }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg w-80 max-h-[70vh] flex flex-col overflow-hidden z-50">
      <div className="bg-gray-100 px-4 py-2 font-semibold flex justify-between items-center">
        <span>Asistente Hotel-Living</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === "avatar" ? "text-left" : "text-right"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg max-w-[90%] ${m.from === "avatar" ? "bg-purple-100 text-black" : "bg-blue-200"}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm outline-none"
          placeholder="Escribe tu pregunta..."
        />
        <button onClick={handleSend} className="px-4 text-sm bg-purple-600 text-white hover:bg-purple-700">
          Enviar
        </button>
      </div>
    </div>
  );
}
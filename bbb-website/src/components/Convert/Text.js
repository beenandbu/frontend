import React from "react";
import { useEffect, useState } from "react";

const backendURL = "https://2d6c-34-125-22-126.ngrok-free.app/";
const backendURLconvert = backendURL + "convert";

const TextsContext = React.createContext({
  texts: [],
  fetchTexts: () => {},
});

function Text() {
  const [texts, setTexts] = useState([]);
  const fetchTexts = async () => {
    const response = await fetch(backendURLconvert, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const texts = await response.json();
    setTexts(texts);
  };
  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <div className="text-card">
      <TextsContext.Provider value={{ texts, fetchTexts }}>
        <textarea
          name="postContent"
          defaultValue={texts}
          rows={23}
          cols={150}
        />
      </TextsContext.Provider>
    </div>
  );
}

export default Text;

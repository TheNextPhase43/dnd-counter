import { useState, useRef, useEffect } from "react";
import s from "./App.module.scss";
import { Character } from "./components/Character/Character.jsx";

function App() {
    const character = useRef();
    const [charactersNamesArray, setCharactersNamesArray] = useState([]);
    const [timeState, setTimeState] = useState(false);

    useEffect(() => {
        console.log(charactersNamesArray);
        character.current.value = "";
    }, [charactersNamesArray]);

    return (
        <>
            <div className={s.page}>
                <div className={s.dndCounterPart}>
                    <div className={s.dndCounterWindow}>
                        <div className={s.dndCounterActionsBlock}>
                            <p>Enter character name: </p>
                            <input
                                className={s.characterNameInput}
                                ref={character}
                                placeholder="..."
                                type="text"
                            />
                            <button
                                onClick={() => {
                                    if (!character.current.value) {
                                        character.current.style.border =
                                            "red 1px solid";
                                        setTimeout(() => {
                                            character.current.style.border =
                                                "black 1px solid";
                                        }, 3000);
                                        return;
                                    } else {
                                        character.current.style.border =
                                            "black 1px solid";
                                        setCharactersNamesArray((prev) => {
                                            return [
                                                ...prev,
                                                character.current.value,
                                            ];
                                        });
                                    }
                                }}
                            >
                                Add
                            </button>
                            <button
                                onClick={() => {
                                    setTimeState((prev) => {
                                        return !prev;
                                    });
                                }}
                            >
                                Skip 1 hour
                            </button>
                        </div>
                        <div className={s.dndCounterCharactersBlock}>
                            {charactersNamesArray.map((el, i) => {
                                return (
                                    <Character
                                        key={i}
                                        characterName={el}
                                        characterId={i}
                                        charactersNamesArray={
                                            charactersNamesArray
                                        }
                                        setCharactersNamesArray={
                                            setCharactersNamesArray
                                        }
                                        timeState={timeState}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

import { useRef, useEffect, useState } from "react";
import s from "./character.module.scss";

export function Character({
    characterName,
    characterId,
    charactersNamesArray,
    setCharactersNamesArray,
    timeState,
}) {
    const saturationRef = useRef();
    const staminaRef = useRef();

    // толи костыль, а толи имба
    // нужен чтобы не вызывать исполнение
    // useEffect при первом рендере
    const useUpdateEffect = (effect, deps) => {
        const isInitialMount = useRef(true);

        useEffect(() => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                return effect();
            }
        }, deps);
    };

    useUpdateEffect(() => {
        if (+saturationRef.current.value - 12 < 0) {
            saturationRef.current.value = 0;
        } else {
            saturationRef.current.value = +saturationRef.current.value - 12;
        }
        if (+staminaRef.current.value - 12 < 0) {
            staminaRef.current.value = 0;
        } else {
            staminaRef.current.value = +staminaRef.current.value - 12;
        }
    }, [timeState]);

    function handleMinus(ref) {
        if (+ref.current.value - 12 < 0) {
            ref.current.value = 0;
            return;
        }
        ref.current.value = +ref.current.value - 12;
    }

    function handlePlus(ref) {
        if (+ref.current.value + 12 > 100) {
            ref.current.value = 100;
            return;
        }
        ref.current.value = +ref.current.value + 12;
    }

    function setValue(ref, value) {
        ref.current.value = value;
    }

    return (
        <div className={s.characterBlock}>
            <p className={s.characterName}>{characterName}</p>
            <div className={s.characterSaturationBlock}>
                <p className={s.characterSaturationText}>Saturation</p>
                <div className={s.saturationBlockActions}>
                    <button
                        onClick={() => {
                            handleMinus(saturationRef);
                        }}
                    >
                        -
                    </button>
                    <input
                        ref={saturationRef}
                        defaultValue={100}
                        className={s.characterSaturation}
                        type="text"
                    />
                    <button
                        onClick={() => {
                            handlePlus(saturationRef);
                        }}
                    >
                        +
                    </button>
                    <button
                        onClick={() => {
                            setValue(saturationRef, 0);
                        }}
                    >
                        Erase
                    </button>
                    <button
                        onClick={() => {
                            setValue(saturationRef, 100);
                        }}
                    >
                        Full
                    </button>
                </div>
            </div>
            <div className={s.characterStaminaBlock}>
                <p className={s.characterStaminaText}>Stamina</p>
                <div className={s.staminaBlockActions}>
                    <button
                        onClick={() => {
                            handleMinus(staminaRef);
                        }}
                    >
                        -
                    </button>
                    <input
                        ref={staminaRef}
                        defaultValue={100}
                        className={s.characterStamina}
                        type="text"
                    />
                    <button
                        onClick={() => {
                            handlePlus(staminaRef);
                        }}
                    >
                        +
                    </button>
                    <button
                        onClick={() => {
                            setValue(staminaRef, 0);
                        }}
                    >
                        Erase
                    </button>
                    <button
                        onClick={() => {
                            setValue(staminaRef, 100);
                        }}
                    >
                        Full
                    </button>
                </div>
            </div>
            <button
                onClick={() => {
                    setCharactersNamesArray((prev) => {
                        const newArray = prev
                            // от первого до предшествующего удаляемому
                            .slice(0, characterId)
                            // от следующего до удаляемого до конца
                            // (длина на 1 больше, как указанный вторым не учитывается)
                            .concat(prev.slice(characterId + 1, prev.length));
                        return newArray;
                    });
                }}
                className={s.deleteButton}
            >
                Delete
            </button>
        </div>
    );
}

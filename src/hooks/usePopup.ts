import { useState } from "react";

export function usePopUp(initialTrigger:boolean) {
    const [trigger, setTrigger] = useState(initialTrigger);

    function openPopUp() {
        setTrigger(true);
    }

    function closePopUp() {
        setTrigger(false);
    }

    return [
        trigger,
        openPopUp,
        closePopUp,
    ]
}
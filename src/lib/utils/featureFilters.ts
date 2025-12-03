import type { Character } from "../../State/characters.state";

export type SelectItem = { value: string; name: string; disabled?: boolean };

export function getAvailableItems(
    type: string,
    availableList: readonly string[],
    characterInstance: Character,
    traitsOpenChoices: string[],
    currentChoiceIndex?: number
): SelectItem[] {
    const filtered = availableList.filter(item => {
        switch (type) {
            case "skill":
                return !characterInstance.proficencies.includes(item);
            case "expertise":
                const chosenInOtherDropdowns = traitsOpenChoices.filter(
                    (_, idx) => idx !== currentChoiceIndex
                );
                return (
                    characterInstance.proficencies.includes(item) //&&
                    //!chosenInOtherDropdowns.includes(item)
                );
            case "saving throw":
                return !characterInstance.saveProficencies?.includes(item);
            case "weapon":
            case "armor":
            case "tool":
                return !characterInstance.proficencies.includes(item);
            default:
                return true;
        }
    });

    return filtered.map(val => ({
        value: val,
        name: val,
        disabled: false
    }));
}

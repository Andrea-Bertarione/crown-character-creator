import type { Character } from "./characters.state";

export type SelectItem = { value: string; name: string; disabled?: boolean };

export function getAvailableItems(
    type: string,
    availableList: readonly string[],
    characterInstance: Character,
): SelectItem[] {
    const filtered = availableList.filter(item => {
        switch (type) {
            case "skill":
                return !characterInstance.proficiencies.skills.includes(item);
            case "expertise":
                return (
                    characterInstance.proficiencies.skills.includes(item) || characterInstance.proficiencies.tools.includes(item)//&&
                    //!chosenInOtherDropdowns.includes(item)
                );
            case "saving throw":
                return !characterInstance.proficiencies.saves.includes(item);
            case "weapon":
            case "armor":
            case "tool":
                return !characterInstance.proficiencies.tools.includes(item);
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

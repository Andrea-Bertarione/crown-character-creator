import type { Character, Race } from "../../State/characters.state";
import featureList from "../../data/features.data";

export function syncToCharacter(
    characterInstance: Character,
    race: Race,
    chosenLanguagesState: string[],
    chosenAbilityModifiersState: string[],
    traitsOpen: { open: boolean; type?: string; choices: string[] }[]
): void {
    characterInstance.choosenLanguages = [
        ...chosenLanguagesState.filter(l => l)
    ];

    characterInstance.chosenAbilityModifiers = [
        ...chosenAbilityModifiersState.filter(a => a)
    ];

    characterInstance.proficencies = [];

    const featureChoices: Record<string, { type: string; value: string[] }> = {};
    race.features.forEach((feature, i) => {
        if (featureList[feature]?.choice && traitsOpen[i].choices.length > 0) {
            const chosenItems = traitsOpen[i].choices.filter(c => c);

            featureChoices[feature] = {
                type: featureList[feature].choice.type,
                value: chosenItems
            };

            if (featureList[feature].choice.type === "skill") {
                chosenItems.forEach(item => {
                    if (!characterInstance.proficencies.includes(item)) {
                        characterInstance.proficencies.push(item);
                    }
                });
            }

            if (featureList[feature].choice.type === "expertise") {
                chosenItems.forEach(item => {
                    if (!characterInstance.expertises.includes(item)) {
                        characterInstance.expertises.push(item);
                    }
                });
            }
        }
    });
    characterInstance.featureChoices = featureChoices;

    race.features.forEach((feature) => {
        featureList[feature].action(characterInstance);
    });
}

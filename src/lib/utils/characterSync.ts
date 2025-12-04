import type {Character, FeatureChoiceType, Race} from "../../State/characters.state";
import featureList from "../../data/features.data";

export function syncToCharacter(
    characterInstance: Character,
    race: Race,
    chosenLanguagesState: string[],
    chosenAbilityModifiersState: string[],
    traitsOpen: { open: boolean; type?: string; choices: string[] }[]
): Character {
    characterInstance.chosenLanguages = [
        ...chosenLanguagesState.filter(l => l)
    ];

    characterInstance.chosenAbilityModifiers = [
        ...chosenAbilityModifiersState.filter(a => a)
    ];

    const featureChoices: Record<string, { type: FeatureChoiceType; value: string[] }> = {};
    race.features.forEach((feature, i) => {
        if (featureList[feature]?.choice && traitsOpen[i] && traitsOpen[i].choices.length > 0) {
            const chosenItems = traitsOpen[i].choices.filter(c => c);

            featureChoices[feature] = {
                type: featureList[feature].choice.type as FeatureChoiceType,
                value: chosenItems
            };
        }
    });
    characterInstance.featureChoices = featureChoices;

    race.features.forEach((feature) => {
        featureList[feature].action(characterInstance);
    });

    return characterInstance;
}

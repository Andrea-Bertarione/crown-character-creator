<script lang="ts">
    import { userState } from "../../State/user.state";
    import {Character, initCharactersState} from "../../State/characters.state";
    import { charactersState as characterData } from "../../State/characters.state";

    import { Card } from "flowbite-svelte";

    if (characterData == null) initCharactersState();

    if (userState.loggedIn) {
        // fetch characters from api
    }

    const testCharacter = new Character();
    testCharacter.name = "Test Character";
    testCharacter.avatar = "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png";
    testCharacter.description = "This is a test character";
    testCharacter.class.name = "Fighter";
    testCharacter.class.spells = [];
    testCharacter.class.features = [];
    testCharacter.class.hpDice = "d10";
    testCharacter.hp = 10;

    characterData.value = [testCharacter];

</script>

{#each characterData.value as character}
    <Card img={character.avatar} href={"/character/" + character.id} class="mb-4 p-4" style="max-width: 20rem;" { ...{ character }}>
        <h3 class="text-3xl dark:text-white">{character.name}</h3>
        <p class="text-2xl dark:text-white">{character.description}</p>
        <div class="flex justify-between mt-4">
            <p class="dark:text-white">{character.race}</p>
            <p class="dark:text-white">{character.class.name}</p>
        </div>
    </Card>
{/each}
<script lang="ts">
    import { Character } from "../../State/characters.state";
    import {Accordion, AccordionItem, Card, Label} from "flowbite-svelte";
    import { charactersState } from "../../State/characters.state";

    // Subscribe to store changes
    let characters: Character[] = $derived.by(() => {
        let chars: Character[] = [];
        charactersState.value.subscribe(map => {
            chars = Array.from(map.values());
        });
        return chars;
    });
</script>

{#each characters as character}
    <Card img={character.avatar} href={"/character/" + character.id} class="mb-4 p-5 max-w-3xl">
        <h3 class="text-3xl dark:text-white">{character.name}</h3>
        <p class="text-2xl dark:text-white">{character.description}</p>
        <div class="flex justify-between mt-4 gap-5">
            <p class="dark:text-white">{character.race.name}</p>
            <p class="dark:text-white">{character.class.name}</p>
        </div>
        <div class="mt-4" >
        </div>
    </Card>
{/each}

<script lang="ts">
    import {Character, charactersState} from "../../../State/characters.state";
    import Header from "../../../components/header/header.svelte";
    let { data }: { data: {characterID: string } } = $props();

    let character: Character | undefined = $derived.by(() => {
        let char: Character | undefined;
        charactersState.value.subscribe(map => {
            char = map.get(data.characterID);
        });
        return char;
    });
</script>

<Header />
<div class="flex flex-col items-center mt-20">
    {#if character}
        {Character.name}
    {:else}
        <h1 class="text-5xl text-red-700">No character found</h1>
    {/if}
</div>
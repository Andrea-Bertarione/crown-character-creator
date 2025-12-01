<script lang="ts">
    import Header from "../../components/header/header.svelte";
    import CharacterList from "../../components/characterList/characterList.svelte";
</script>

<Header />
<div class="flex flex-col items-center justify-center">
    <h2 class="text-5xl font-bold dark:text-white">Your Characters</h2>
    <div class="flex flex-row justify-start mt-10">
        <CharacterList />
    </div>
</div>
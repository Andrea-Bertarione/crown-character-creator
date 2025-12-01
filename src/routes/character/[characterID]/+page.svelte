<script lang="ts">
    import Header from "../../../components/header/header.svelte";
    let { data }: { data: {characterID: string } } = $props();

</script>

<Header />
{data.characterID}
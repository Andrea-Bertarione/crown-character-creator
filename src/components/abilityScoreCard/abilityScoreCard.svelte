<script lang="ts">
    import { Card } from "flowbite-svelte";

    let { score } = $props<{ score: number }>();
    let modifier = $derived(Math.floor((score - 10) / 2))
</script>

<div class="px-2">
    <Card
            class="relative flex flex-col items-center justify-start h-18 w-18 rounded-lg border border-gray-400/70 bg-slate-900 text-4xl font-semibold text-white"
    >
        <span class="mt-1">{score}</span>
        <Card
                class="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-full border border-gray-400/80 bg-slate-800 text-lg font-bold gap-0"
        >
            <span>
                {modifier > 0 ? '+' : ''}{modifier}
            </span>
        </Card>
    </Card>
</div>

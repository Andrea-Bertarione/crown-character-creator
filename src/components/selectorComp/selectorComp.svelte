<script lang="ts">
    import type { Snippet } from 'svelte';
    import {Button, Modal} from "flowbite-svelte";
    import {ChevronLeftOutline} from "flowbite-svelte-icons";

    interface props {
        numberOfSteps: number;
        side: Snippet<[currentStep: number]>;
        steps: Snippet<[i: number]>;
        headers: Snippet<[currentStep: number]>;
        actions: Snippet<[currentStep: number, nextStep: () => void, previousStep: () => void]>;
        selectedSide: number;
        isOpen: boolean;
    }

    let { numberOfSteps, side, steps, headers, actions, isOpen = $bindable(), selectedSide = $bindable() }: props = $props();

    let currentStep: number = $state(0);
</script>s

{#snippet header()}
	<div class="flex items-center justify-between px-6 pb-4 border-b border-gray-700">
            <div class="flex items-center gap-3">
                {#if currentStep !== 0}
                    <button onclick={() => currentStep--} class="text-gray-400 hover:text-white transition">
                        <ChevronLeftOutline class="w-15 h-15" />
                    </button>
                {/if}
                <div>
                    <h2 class="text-3xl font-bold">
                        {@render headers(currentStep)}
                    </h2>
                </div>
            </div>
        </div>
{/snippet}

{#snippet sideWrapper()}
    {@render side(currentStep)}
{/snippet}

<Modal bind:open={isOpen} size="xl" class="!max-w-6xl">
    <div class="py-4 h-[600px] flex flex-col">
        {@render header()}
        <div class="flex flex-1 overflow-hidden">
            <div class="w-48 border-r border-gray-700 overflow-y-auto">
                {@render sideWrapper()}
            </div>

            <div class="relative flex-1 overflow-y-auto p-6">
                {@render steps(currentStep)}
            </div>
        </div>
        <div class="flex gap-3 justify-end pt-4 px-6 border-t border-gray-700">
            <Button onclick={() => (isOpen = false)} color="alternative">
                Cancel
            </Button>
            {#if currentStep !== 0}
                <Button onclick={() => (currentStep--)} color="alternative">
                    Back
                </Button>
            {/if}
            {@render actions(currentStep,
                () => {
                    currentStep++
                },
                () => {
                    currentStep--
                }
            )}
        </div>
    </div>
</Modal>

<style>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: oklch(68.5% 0.169 237.323);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: oklch(68.5% 0.169 237.323);
    }
</style>
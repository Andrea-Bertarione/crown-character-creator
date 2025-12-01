<script lang="ts">
    import { P, TimelineStepper, GradientButton } from "flowbite-svelte";
    import Header from "../components/header/header.svelte";
    import MainIcon from "$lib/assets/main_icon.svg"

    let current = $state(2);
    const steps = [
        {
            id: 1,
            label: "Step 1 (Press the icon to complete)",
            description: "Choose your character race and class.",
        },
        {
            id: 2,
            label: "Step 2",
            description: "Choose your character stats and skills.",

        },
        {
            id: 3,
            label: "Step 3",
            description: "Choose your character background.",
        },
        {
            id: 4,
            label: "Step 4",
            description: "Choose your character equipment.",
        },
        {
            id: 5,
            label: "Step 5",
            description: "Choose your character spells if present.",
        },
        {
            id: 6,
            label: "Step 6",
            description: "Finalize the character and download your sheet.",
        }
    ];
</script>

<Header />
<div class="flex flex-col items-center">
    <h1 class="flex flex-row items-center mt-10">
        <img src={MainIcon} alt="Crown character creator icon" class="w-24 mr-10" />
        <span class="text-6xl dark:text-white">Crown Character Creator</span>
    </h1>
    <P class="mb-3 mt-16 text-gray-600 dark:text-gray-300" size="2xl" weight="light">
        Never worry about your character sheet again!
    </P>
    <P class="text-gray-500 dark:text-gray-400" size="xl" weight="light">
        This tool will elevate your character creation experience by assisting you step by step.
    </P>
    <P class="text-gray-500 dark:text-gray-400" size="xl" weight="light">
        Instead of copy pasting spells and numbers, generate your unique character sheet with ease.
    </P>

    <TimelineStepper class="mt-10 dark:text-white"  {steps} bind:current />
    {#if current === 6}
        <GradientButton class="mt-14" href="/create">Get Started</GradientButton>
    {/if}
</div>
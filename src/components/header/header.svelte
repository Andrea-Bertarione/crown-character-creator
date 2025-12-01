<script lang="ts">
    import { page } from "$app/state";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, GradientButton } from "flowbite-svelte";
    import { DarkMode } from "flowbite-svelte";
    import MainIcon from '$lib/assets/main_icon.svg';

    let activeUrl = $derived(page.url.pathname)
</script>

<Navbar>
    <NavBrand href="/">
        <img src={MainIcon} class="me-3 h-6 sm:h-9" alt="Crown character creator Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Crown Character Creator</span>
    </NavBrand>
    <NavHamburger />
    <NavUl {activeUrl}>
        <div class="flex flex-row items-center space-x-2">
            <DarkMode />
            <NavLi activeClass="font-bold dark:text-white" href="/">Home</NavLi>
            <NavLi activeClass="font-bold dark:text-white" href="/about">About</NavLi>
            <NavLi activeClass="font-bold dark:text-white" href="/create">Create</NavLi>
            <GradientButton outline color="cyanToBlue" href="/login">Login</GradientButton>
        </div>
    </NavUl>
</Navbar>
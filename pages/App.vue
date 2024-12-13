<template>
<div class="h-full">
		<div class="h-full">
			<div class="flex flex-col justify-start items-start">
				<layout-header></layout-header>
        <layout-content class="w-full overflow-x-hidden xl:pt-[218px] pt-[110px]">
          <router-view></router-view>
        </layout-content>
        <layout-footer></layout-footer>
			</div>
		</div>
	</div>
</template>

<script>
import LayoutHeader from '@layouts/Header.vue';
import LayoutContent from '@layouts/Content.vue';
import LayoutFooter from '@layouts/Footer.vue';

export default {
	components: {
		'layout-footer': LayoutFooter,
		'layout-content': LayoutContent,
		'layout-header': LayoutHeader
	},
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

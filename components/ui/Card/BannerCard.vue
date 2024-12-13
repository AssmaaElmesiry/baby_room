<template>
	<div
		class="w-full rounded-md transition ease-in duration-300 overflow-hidden"
    
	>
		<div class="">
			<div
				class=""
				v-if="header"
			>
        <div
          class=""
        >
          <slot name="title"></slot>
        </div>
			</div>
			<div class="">
				<slot name="content"></slot>
			</div>
			<div
				class=""
				v-if="footer"
			>
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		header: {
			type: Boolean,
			default: true
		},
		footer: {
			type: Boolean,
			default: false
		},
	},
  data() {
    return{
    }
  },
  methods: {
   
  }
};
</script>

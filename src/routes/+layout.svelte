<script lang="ts">
import "../app.css";

const { children, data } = $props();
</script>

<h1>Hello {data.session ? data.session.user.email : "Guest"}</h1>

{@render children()}

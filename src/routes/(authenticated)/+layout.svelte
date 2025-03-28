<script lang="ts">
  import type { LayoutData } from './$types';

    interface LayoutProps {
        data: LayoutData
        title?: string;
        description?: string;
    }

    const { children, data } = $props();
</script>

{@render children()}
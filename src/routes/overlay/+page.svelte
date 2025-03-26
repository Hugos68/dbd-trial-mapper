<script lang="ts">
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    import '../../app.css';
    import { listen } from '@tauri-apps/api/event';
    import { currentMonitor, PhysicalPosition, PhysicalSize } from '@tauri-apps/api/window';
    import { onDestroy, tick } from 'svelte';

    const overlay = WebviewWindow.getCurrent();
    let image: HTMLImageElement = $state()!;

    listen<string>('load:image', async (event) => {
        const monitor = await currentMonitor();
        if (!monitor) {
            throw new Error('No monitor found');
        }
        image.src = event.payload;
        await tick();
        await overlay.setSize(new PhysicalSize(image.width, image.height));
        await overlay.setPosition(new PhysicalPosition({
            x: monitor.size.width - image.width,
            y: 0,
        }));
        await overlay.show();
    }).then(onDestroy);
</script>

<img width={300} bind:this={image} onload={() => overlay.show()} onerror={() => overlay.hide()} alt="overlay" />

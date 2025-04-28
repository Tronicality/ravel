document.addEventListener('DOMContentLoaded', function () {
    const playTab = document.getElementById('play-tab');
    const replayTab = document.getElementById('replay-tab');
    const playContent = document.getElementById('play-content');
    const replayContent = document.getElementById('replay-content');

    const panel = document.getElementById('panel');
    const settings = document.getElementById('settings');
    const hotkeys = document.getElementById('hotkeys');

    const replayPanel = document.getElementById('replay-panel');
    const replaySettings = document.getElementById('replay-settings');
    const replayHotkeys = document.getElementById('replay-hotkeys');

    function switchToPlayMode() {
        // Switch tabs
        playTab.classList.add('active');
        replayTab.classList.remove('active');
        playContent.classList.add('active');
        replayContent.classList.remove('active');

        // Animate out replay panels
        replayPanel.classList.remove('slide-in-left');
        replayPanel.classList.add('slide-out-left');
        replaySettings.classList.remove('slide-in-left');
        replaySettings.classList.add('slide-out-left');
        replayHotkeys.classList.remove('slide-in-right');
        replayHotkeys.classList.add('slide-out-right');

        // Animate in play panels
        panel.classList.remove('slide-out-left');
        panel.classList.add('slide-in-left');
        settings.classList.remove('slide-out-left');
        settings.classList.add('slide-in-left');
        hotkeys.classList.remove('slide-out-right');
        hotkeys.classList.add('slide-in-right');

        // Hide replay panels and show play panels
        setTimeout(() => {
            replayPanel.style.display = 'none';
            replaySettings.style.display = 'none';
            replayHotkeys.style.display = 'none';

            panel.style.display = 'block';
            settings.style.display = 'block';
            hotkeys.style.display = 'block';
        }, 500);
    }

    function switchToReplayMode() {
        // Switch tabs
        replayTab.classList.add('active');
        playTab.classList.remove('active');
        replayContent.classList.add('active');
        playContent.classList.remove('active');

        // Animate out play panels
        panel.classList.remove('slide-in-left');
        panel.classList.add('slide-out-left');
        settings.classList.remove('slide-in-left');
        settings.classList.add('slide-out-left');
        hotkeys.classList.remove('slide-in-right');
        hotkeys.classList.add('slide-out-right');

        // Animate in replay panels
        replayPanel.classList.remove('slide-out-left');
        replayPanel.classList.add('slide-in-left');
        replaySettings.classList.remove('slide-out-left');
        replaySettings.classList.add('slide-in-left');
        replayHotkeys.classList.remove('slide-out-right');
        replayHotkeys.classList.add('slide-in-right');

        // Hide play panels and show replay panels
        setTimeout(() => {
            panel.style.display = 'none';
            settings.style.display = 'none';
            hotkeys.style.display = 'none';

            replayPanel.style.display = 'block';
            replaySettings.style.display = 'block';
            replayHotkeys.style.display = 'block';
        }, 500);
    }

    function applyAnimationDelays(selector) {
        const listItems = document.querySelectorAll(`${selector} ul li`);
        listItems.forEach((item, index) => {
            const delay = (index + 1) * 0.05;
            item.style.animationDelay = `${delay}s`;
        });
    }

    playTab.addEventListener('click', switchToPlayMode);
    replayTab.addEventListener('click', switchToReplayMode);

    applyAnimationDelays('#hotkeys');
    applyAnimationDelays('#replay-hotkeys');
    panel.style.display = 'block';
    settings.style.display = 'block';
    hotkeys.style.display = 'block';
    panel.classList.add('slide-in-left');
    settings.classList.add('slide-in-left');
    hotkeys.classList.add('slide-in-right');
    replayPanel.classList.add('slide-out-left');
    replaySettings.classList.add('slide-out-left');
    replayHotkeys.classList.add('slide-out-right');
});
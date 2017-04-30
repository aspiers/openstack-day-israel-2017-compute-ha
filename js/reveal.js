// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    // If you change these, make sure $aspect-ratio in the .scss file
    // is updated accordingly:
    width: 1600,
    height: 900,

    margin: 0.01,

    controls: false,
    slideNumber: true,
    progress: true,
    history: true,
    center: false,

    defaultTiming: 120,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'none', // default/cube/page/concave/zoom/linear/fade/none

    menu: {
        themes: false,
        transitions: false,
        openButton: false,
        openSlideNumber: true,
        markers: true
    },

    // Optional libraries used to extend on reveal.js
    dependencies: [
        { src: 'reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: 'reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: 'reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
        { src: 'reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
        { src: 'reveal.js-menu/menu.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
});

// If we wanted mouse clicks to advance to next / previous slides, this is
// how we'd do it:

// window.addEventListener("mousedown", handleClick, false);
// window.addEventListener("contextmenu", function(e) { e.preventDefault(); }, false);
function handleClick(e) {
    e.preventDefault();
    if(e.button === 0) Reveal.next();
    // if(e.button === 2) Reveal.prev();
}

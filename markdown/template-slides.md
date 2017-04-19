<!-- .slide: data-state="cover" id="cover-page" data-timing="20" -->
<div class="title">
    <h1>Presentation Title</h1>
    <h2>Subhead or Second Line</h2>
</div>

<div class="presenter">
    <h3 class="name">Presenter Name</h3>
    <h3 class="job-title">Job Title</h3>
    <h3 class="email"><a href="mailto:firstname.lastname@suse.com">firstname.lastname@suse.com</a></h3>
</div>


<!-- .slide: data-state="normal" id="nested-lists" data-timing="20s" data-menu-title="Standard text slide" -->
## Slide title

*   First-level bullet
    *   Second-level bullet
        *   Third-level bullets are a bad idea
            *   Fourth-level bullets are a terrible idea

Before loading up your presentation with bulleted lists, make sure to
[read up on whether that's a good idea](https://www.google.com/search?q=slides+bullets).


<!-- .slide: data-state="section-break" id="section-break-1" data-timing="10s" -->
# Section break (style 1)
## `<h2>` works here too


<!-- .slide: data-state="section-break-2" id="template-slides-2" data-timing="10s" -->
# Section break (style 2)


<!-- .slide: data-state="section-break-3" id="template-slides-3" data-timing="10s" -->
# Section break (style 3)


<!-- .slide: data-state="section-break-4" id="template-slides-4" data-timing="10s" -->
# Section break (style 4)


<!-- .slide: data-state="normal" id="syntax-highlighting" -->
## Code syntax highlighting

Works out of the box using [`highlight.js`](https://highlightjs.org/)
and a custom color theme with official SUSE colors:

```js
Reveal.addEventListener('somestate', function() {
    // TODO: Sprinkle magic
}, false );
```

in different languages:

```ruby
# Ping with 5 seconds timeout and a single attempt
def ping! node
  command = ["ping", "-q -c 5 -w 5 #{node.ip}"]
  result = exec!(*command)
  if result.exit_code.nonzero?
    raise PingError.new(command, result.output)
  end
  result, :foo
end
```

<!-- .slide: data-state="break" -->
# Section Break Text Here
## `<h2>` works here too


<!-- .slide: data-state="normal" -->
## Title of No-Logo Slide Here

*   First-level bullet
    *   Second-level bullet
        *   Third-level bullet
            *   Fourth-level bullet


<!-- .slide: data-state="normal" id="guidelines" -->
## Editorial Guidelines

To help you achieve a consistent, professional message, general
guidelines about SUSE style and grammar usage are outlined below.

*   **Acronyms**: Acronyms may be used for industry terms provided you
    spell out the terms at first reference in body copy:

    *   Example: The Independent Software Vendor (ISV) solution …
    *   Do NOT abbreviate product names in external presentations

*   **Capitalization**: The title of the presentation and the title and
    subtitle of each slide are the only elements that should be
    capitalized in title case. All other elements should be
    capitalized in sentence case (only the first word of each sentence
    capitalized). This includes bullet points, call outs, emphasized
    words, table headings and captions.

*   **Hyphenated compounds within titles**: If a hyphenated compound
    appears in a title, capitalize the word following the hyphen; for
    example, “Low-Cost Alternatives” would be capitalized as shown.

*   **Bulleted lists**: To set off the lead text in bulleted lists (the
    words “Bulleted lists” in this case), use colons. Try to keep
    information presented in bulleted lists short, so it is easy for
    audiences to consume.

*   **Punctuation within bulleted lists**: Be consistent when punctuating
    bulleted lists. For example, if you choose to use a complete
    sentence in the first bullet, use complete sentences, and
    punctuate accordingly for all bullets on that slide.

*   **General punctuation**: Use “and” instead of “&” except in proper
    names (e.g., AT&T). Write out percent signs.


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
# How to use this presentation template

[Fork this repo](https://github.com/aspiers/presentation-template/fork) and
drop Markdown files into [`markdown/`](markdown) and images
into [`images/`](images). Then, fix up [`index.html`](index.html) to
include your Markdown-authored sections.

This repo has two branches, one named `master` and one
`gh-pages`. Make sure you do your regular work in `master`, then run
[`./bin/update-gh-pages.sh`](bin/update-gh-pages.sh).  Alternatively
merge into `gh-pages` and push both branches. Your presentation will
then be rendered to [GitHub Pages](https://pages.github.com/) at a URL
of the form:

-   http://*username*.github.io/*presentation-repo-name*

You can share the URL immediately, and GitHub will host it for you,
indefinitely, for free.

## Theming

The theme is defined
in [`css/reveal-override.scss`](css/reveal-override.scss)
using [Sass](http://sass-lang.com/); if you update this, you will need
to re-compile into `css/reveal-override.css` via:

    $ sass css

If you are doing continual development on the file, then run this in
the background to automatically re-compile every time the `.scss` file
is changed:

    $ sass --watch css

If you are using GitHub Pages, make sure that the latest versions of
the generated `.css` files are committed and pushed to the remote
`gh-pages` branch.
The [`./bin/update-gh-pages.sh`](bin/update-gh-pages.sh) script serves
as an example of how to automate this.

## Running things locally

Whilst editing slides it is strongly recommended to render your slides
locally, rather than on GitHub Pages, so that you can see your edits
take immediate effect without having to `git push` each change.  To
do this, a few simple steps are required.

### Retrieve the dependencies

Use the provided `.gitmodules` file to automatically clone local
copies of `reveal.js`,
[`qrcodejs`](https://davidshimjs.github.io/qrcodejs/), and
[`reveal.js-menu`](https://github.com/denehyg/reveal.js-menu):

    git submodule init
    git submodule update

### Generate the stylesheet

Generate the CSS with Sass as described above.  The `--watch` option
is strongly recommended for continuous development.

### Serve the files via a web server

The files must be served by a local web server.

#### Python webserver

If you have Python installed, the easiest way is probably to run this
one-line command from the repository:

    python -m SimpleHTTPServer 8000

#### Apache

Alternatively if you already have Apache installed, you can just move
or symlink the repository into Apache's `DocumentRoot` or some other
directory which Apache is configured to serve.  For example, Apache
is often configured to serve all files under `~/public_html`, so you
could do:

    ln -s ~/git/my-presentation ~/public_html/

and then access your presentation from

-   http://localhost/~yourusername/my-presentation/

#### lighttpd

If you are using [`lighttpd`](https://www.lighttpd.net/), you may also
want to set the following options:

    dir-listing.encoding = "utf-8"
    server.dir-listing   = "enable"
    server.modules      += ( "mod_userdir" )
    userdir.path         = "public_html"

to achieve a similar result using `~/public_html`.

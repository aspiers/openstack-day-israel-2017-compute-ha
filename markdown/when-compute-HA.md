<!-- .slide: data-state="section-break" id="when" data-menu-title="Why compute HA?" data-timing="10" -->
# Does OpenStack need HA 
# on the compute plane?

Note:
The previous slide suggests there is a problem which needs
solving, but does it *always* need solving?


<!-- .slide: data-state="normal" id="pets-vs-cattle" class="pets-vs-cattle" data-timing="50" -->
## Pets vs. cattle

<div class="row pets">
    <div class="col-md-5">
        <img data-src="images/begging-cat-c2.jpg" alt="cute pleading cat"
             class="pull-right" />
    </div>
</div>

<div class="row cattle">
    <div class="col-md-5">
        <img data-src="images/cattle-c.jpg" alt="cattle" class="pull-right" />
    </div>
</div>

Note:
- Pets are typically given unique names, whereas cattle aren't.
- This reflects that pets take a lot of work to create and look after,
  whereas cattle don't.
- Similarly, when something goes wrong with a pet, you need to
  invest a lot of effort to fix it, whereas with cattle you just get another one.
- thanks to CERN for this slide, and Bill Baker for the original terminology


<!-- .slide: data-state="normal" id="white-elephant" data-timing="40" data-menu-title="White elephant" -->
## Addressing the white elephant in the room

<div>
    <img alt="The white elephant in the room"
         class="fragment"
         style="height: 90%; margin: -40px 0 0 50;"
         data-src="images/white-elephant.svg" />
</div>

Note:

Compute node HA is a controversial feature, because
some people think it's an anti-pattern which does not belong,
in clouds, whereas other people feel a strong need for it.


<!-- .slide: data-state="normal" id="justification" data-menu-title="Justification" data-timing="60" -->
## Does OpenStack really need HA on the compute plane?

<span class="fragment" data-fragment-index="1">
    <img class="fragment fade-out" data-fragment-index="2"
         data-src="images/yes-or-no.svg" alt="Yes!" />
</span>

### Why?  <!-- .element: class="fragment" data-fragment-index="2" style="margin-top: 80px" -->

*   Compute <!-- .element: class="fragment" data-fragment-index="2" -->
    HA needed for cattle as well as pets
*   Valid <!-- .element: class="fragment" data-fragment-index="3" -->
    reasons for running pets in OpenStack
    *   Manageability benefits
    *   Want to avoid multiple virtual estates
    *   Too expensive to cloudify legacy workloads

Note:

So to sum up, my vote is yes, because even cattle need compute node HA.

Also, rather than painful "big bang" migrations to cloud-aware
workloads, it's easier to deprecate legacy workloads, let them reach
EOL whilst gradually migrating over to next-generation architectures.

This is a controversial topic, but naysayers tend to favour idealism
over real world pragmatism.

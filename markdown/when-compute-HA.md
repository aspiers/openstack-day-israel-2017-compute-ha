<!-- .slide: data-state="section-break" id="when" data-menu-title="Why compute HA?" data-timing="10" -->
# Does OpenStack need HA
# on the compute plane?

Note:
The previous slide suggests there is a problem which needs
solving, but does it *always* need solving?


<!-- .slide: data-state="normal" id="pets-vs-cattle" class="pets-vs-cattle" data-timing="40" -->
## Pets vs. cattle

<div style="display: flex; justify-content: center; height: 87%">
  <img data-src="images/kitten.jpg" alt="cute kitten" class="fragment" />
  <img data-src="images/brown-cow.jpg" alt="cattle" class="fragment"
       style="margin-left: 5%;" />
</div>

Note:

- Pets are each unique, irreplaceable, stateful, and take a lot of
  work to create and look after.
- Cattle are all the same, and usually stateless, so when something
  goes wrong with one you just get another one to replace it.
- Thanks to Bill Baker for the original terminology.


<!-- .slide: data-state="normal" id="cattle" data-timing="90" -->
## Cattle: ideal for the cloud

<img data-src="images/cloud.jpg" class="cloud" alt="cloud outline" />

<!-- compute nodes -->
<img data-src="images/rounded-rect.svg" class="compute-node col-1 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-2 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-3 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-4 fragment"
     data-fragment-index="1" alt="Compute node" />

<!-- row 1 -->
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/brown-cow.jpg" class="cow row-1 col-1 fragment" alt="cattle"
     data-fragment-index="2" />
</span>
<img data-src="images/brown-cow.jpg" class="cow row-1 col-2 fragment" alt="cattle"
     data-fragment-index="3" />
<img data-src="images/brown-cow.jpg" class="cow row-1 col-3 fragment" alt="cattle"
     data-fragment-index="4" />

<!-- explode first cow in row 1 -->
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/explosion.svg" class="cow-bang row-1 col-1 fragment"
     data-fragment-index="5" alt="cow failure" />
</span>
<img data-src="images/brown-cow.jpg" class="cow row-1 col-4 fragment" alt="cattle"
     data-fragment-index="6" />

<!-- row 2 -->
<img data-src="images/brown-cow.jpg" class="cow row-2 col-1 fragment" alt="cattle"
     data-fragment-index="7" />
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-2 fragment" alt="cattle"
     data-fragment-index="8" />
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-3 fragment" alt="cattle"
     data-fragment-index="9" />
</span>

<!-- explode third cow in row 2 -->
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/explosion.svg" class="cow-bang row-2 col-3 fragment"
     data-fragment-index="10" alt="cow failure" />
</span>
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-4 fragment" alt="cattle"
     data-fragment-index="11" />

<!-- row 3 -->
<img data-src="images/CowFace-c.jpg" class="cow row-3 col-1 fragment" alt="cattle"
     data-fragment-index="12" />
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/brown-cow.jpg" class="cow row-3 col-2 fragment" alt="cattle"
     data-fragment-index="13" />
</span>

<!-- explode second cow in row 3 -->
<span class="fade-out fragment" data-fragment-index="16">
<img data-src="images/explosion.svg" class="cow-bang row-3 col-2 fragment"
     data-fragment-index="14" alt="cow failure" />
</span>
<img data-src="images/brown-cow.jpg" class="cow row-3 col-3 fragment" alt="cattle"
     data-fragment-index="15" />

<!-- compute node failure -->
<img data-src="images/solid-rect.svg"
     class="compute-node fade col-1 fragment"
     data-fragment-index="17" alt="Unreachable compute node"/>
<img data-src="images/reboot.png"
     class="reboot-compute-node col-1 fragment"
     data-fragment-index="18" alt="Reboot compute node"/>

Note:

- Individual failures handled by deploying more instances
- One cattle workload *might* be naturally resilient:
  application layer handles failures and autoscales
- But another workload might be "dumb cattle"
  => need control plane to resurrect
- Can also use OpenStack API to clean up failed instances
- What if a whole compute host fails?
- Even if all cattle are "smart", still might want to handle failures
  in the cloud infrastructure layer, e.g. by rebooting compute host.


<!-- .slide: data-state="normal" id="why-pets" data-menu-title="Pets in the cloud" data-timing="50" -->
## Valid reasons for running pets in the cloud

*   <!-- .element: class="fragment" data-fragment-index="2" -->
    Manageability benefits
*   <!-- .element: class="fragment" data-fragment-index="3" -->
    Want to avoid multiple virtual estates
*   <!-- .element: class="fragment" data-fragment-index="4" -->
    Too expensive to cloudify legacy workloads

Note:

Rather than painful "big bang" migrations to cloud-aware workloads,
it's easier to deprecate legacy workloads, let them reach EOL whilst
gradually migrating over to next-generation architectures.

This is a controversial topic, but naysayers tend to favour idealism
over real world pragmatism.


<!-- .slide: data-state="normal" id="pet-failures" data-timing="70" -->
## Pet failures in the cloud

<img data-src="images/cloud.jpg" class="cloud" alt="cloud outline" />

<!-- compute nodes -->
<img data-src="images/rounded-rect.svg" class="compute-node col-1 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-2 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-3 fragment"
     data-fragment-index="1" alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-4 fragment"
     data-fragment-index="1" alt="Compute node" />

<img data-src="images/brown-cow.jpg" class="cow row-1 col-1 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/orange-kitten.jpg" class="kitteh2 row-1 col-2 fragment" alt="kitteh"
     data-fragment-index="2" />
<img data-src="images/brown-cow.jpg" class="cow row-1 col-3 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/brown-cow.jpg" class="cow row-1 col-4 fragment" alt="cattle"
     data-fragment-index="2" />

<img data-src="images/brown-cow.jpg" class="cow row-2 col-1 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-2 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-3 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/CowFace-c.jpg" class="cow row-2 col-4 fragment" alt="cattle"
     data-fragment-index="2" />

<img data-src="images/kitten.jpg" class="kitteh row-3 col-1 fragment" alt="kitteh"
     data-fragment-index="2" />
<img data-src="images/brown-cow.jpg" class="cow row-3 col-2 fragment" alt="cattle"
     data-fragment-index="2" />
<img data-src="images/kitten2.jpg" class="kitteh3 row-3 col-3 fragment" alt="cattle"
     data-fragment-index="2" />

<!-- compute node failure -->
<img data-src="images/solid-rect.svg"
     class="compute-node fade col-1 fragment"
     data-fragment-index="3" alt="Unreachable compute node"/>
<img data-src="images/reboot.png"
     class="reboot-compute-node col-1 fragment"
     data-fragment-index="4" alt="Reboot compute node"/>

Note:

- When a compute node becomes unresponsive, any stateful pets running
  there need to be carefully resurrected elsewhere.
- Fencing (e.g. power off node) required to avoid data corruption.


<!-- .slide: data-state="normal" id="justification" data-menu-title="Justification" data-timing="15" -->
## Does OpenStack really need compute plane HA?

<span class="fragment" data-fragment-index="1">
    <img data-src="images/yes-or-no.svg" alt="Yes!" />
</span>

Note:

So to sum up, the community consenus these days is generally yes,
because compute node HA is certainly needed for protecting pets, and
also sometimes for cattle.


<!-- .slide: data-state="blank-slide" class="full-screen" id="user-story" data-menu-title="User story" data-timing="40" -->
<a href="http://specs.openstack.org/openstack/openstack-user-stories/user-stories/proposed/ha_vm.html">
    <img alt="User story" src="images/user-story.png"/>
</a>

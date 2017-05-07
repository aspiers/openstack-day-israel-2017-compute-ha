<!-- .slide: data-state="section-break" id="design-goals" data-timing="20" -->
# Design goals


<!-- .slide: data-state="normal" id="scalability" class="scalability" data-menu-title="Scalability" data-timing="10" -->
## Design goal: Scalability

<figure>
    <img alt="CERN datacenter"
         data-src="images/CERN-datacenter.jpg" />
     <figcaption>
         CERN datacenter
         <a href="https://www.flickr.com/photos/torkildr/3462607995">
             &copy; Torkild Retvedt CC-BY-SA 2.0
         </a>
     </figcaption>
</figure>

Note:

Clouds will often scale to *many* compute nodes
- 100s, or even 1000s.  This means that whatever components we use for
compute plane HA must not introduce new bottlenecks.  Luckily there is
a technology called `pacemaker_remoted` which helps us with that, and
the upstream community has already reached a consensus to use it.


<!-- .slide: data-state="normal" id="common-architecture" data-menu-title="Architecture" class="architecture" data-timing="40" -->
## Interlude: Common, scalable architecture

<div class="architecture">
    <img alt="Architecture with pacemaker_remote"
         class="architecture"
         data-src="images/standard-architecture.svg" />

    <img alt="Architecture with pacemaker_remote arrows"
         class="architecture fragment"
         data-src="images/standard-architecture-remote-arrows.svg" />
</div>

Note:
Scalability issue solved by `pacemaker_remote`

*   New(-ish) Pacemaker feature
*   Allows core cluster nodes to control "remote"
    nodes via a `pacemaker_remote` proxy service (daemon)
*   Can scale to very large numbers


<!-- .slide: data-state="normal" id="failure-modes" class="architecture" data-menu-title="Failure modes" data-timing="120" -->
## Design goal: handle different failure modes

<div class="architecture">
    <img alt="Architecture with pacemaker_remote"
         class="architecture"
         data-src="images/standard-architecture.svg" />
    <span class="fragment" data-fragment-index="1">
        <img class="fragment fade-out compute-node bang"
             data-fragment-index="2"
             alt="compute node explosion!"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="2">
        <img class="fragment fade-out kernel bang"
             data-fragment-index="3"
             alt="kernel / OS crash or hang"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="3">
        <img class="fragment fade-out libvirt bang"
             data-fragment-index="4"
             alt="libvirt crash or hang"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="4">
        <img class="fragment fade-out nova-compute bang"
             data-fragment-index="5"
             alt="nova-compute crash or hang"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="5">
        <img class="fragment fade-out nova-api bang"
             data-fragment-index="6"
             alt="nova-api crash or hang"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="6">
        <img class="fragment fade-out recovery bang"
             data-fragment-index="7"
             alt="recovery controller crash or hang"
             data-src="images/explosion.svg" />
    </span>
    <span class="fragment" data-fragment-index="7">
        <img class="fragment fade-out VM bang"
             data-fragment-index="8"
             alt="VM crash or hang"
             data-src="images/explosion.svg" />
    </span>
        <img class="fragment workload bang"
             data-fragment-index="8"
             alt="workload crash or hang"
             data-src="images/explosion.svg" />
</div>

Note:

*   Needs to protect critical data ⇒ requires *fencing* of either
    *   storage resource, *or*
    *   of faulty node (a.k.a. **STONITH**)

    See [previous talk](https://www.openstack.org/videos/video/high-availability-for-pets-and-hypervisors-state-of-the-nation) for details.

*   Needs to handle failure or (temporary) freeze of:
    *   Hardware (including various NICs)
    *   Kernel
    *   Hypervisor services (e.g. `libvirt`)
    *   OpenStack control plane services
        *   including recovery workflow controller -
            this requires persisting workflows to disk
            and being able to resume workflows if the
            controller dies
    *   VM
    *   Workload inside VM (ideally)

We assume that Pacemaker is reliable, otherwise we're sunk!


<!-- .slide: data-state="normal" id="operability" data-menu-title="Operability" data-timing="60" -->
## Design goal: Operability

<figure>
    <img alt="API" data-src="images/API.jpg" style="width: 100%" />
</figure>

Note:

Cloud operators need an API to access details of ongoing and
historical alerts and corresponding actions.

This could be incorporated into Horizon.


<!-- .slide: data-state="normal" id="configurability" data-menu-title="Configurability" data-timing="60" -->
## Design goal: Configurability

<img data-src="images/cloud.jpg" class="cloud" alt="cloud outline" />

<!-- compute nodes -->
<img data-src="images/rounded-rect.svg" class="compute-node col-1"
     alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-2"
     alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-3"
     alt="Compute node" />
<img data-src="images/rounded-rect.svg" class="compute-node col-4"
     alt="Compute node" />

<img data-src="images/brown-cow.jpg" class="cow row-1 col-1" alt="cattle" />
<img data-src="images/kitten.jpg" class="kitteh row-1 col-2" alt="kitteh" />
<img data-src="images/brown-cow.jpg" class="cow row-1 col-3" alt="cattle" />
<img data-src="images/brown-cow.jpg" class="cow row-1 col-4" alt="cattle" />

<img data-src="images/brown-cow.jpg" class="cow row-2 col-1" alt="cattle" />
<img data-src="images/brown-cow.jpg" class="cow row-2 col-2" alt="cattle" />
<img data-src="images/brown-cow.jpg" class="cow row-2 col-3" alt="cattle" />
<img data-src="images/brown-cow.jpg" class="cow row-2 col-4" alt="cattle" />

<img data-src="images/kitten.jpg" class="kitteh row-3 col-1" alt="kitteh" />
<img data-src="images/brown-cow.jpg" class="cow row-3 col-2" alt="cattle" />

<!-- compute node failure -->
<div class="fade-out fragment" data-fragment-index="2">
  <div class="two-compute-nodes fade az1 col-1 fragment"
       data-fragment-index="1" alt="Availability zone 1"></div>
  <div class="two-compute-nodes fade az2 col-3 fragment"
       data-fragment-index="1" alt="Availability zone 2"></div>
</div>

<div class="fade-out fragment" data-fragment-index="3">
  <div class="fade project col-1 row-1 fragment"
       data-fragment-index="2" alt="Project instance"></div>
  <div class="fade project col-2 row-2 fragment"
       data-fragment-index="2" alt="Project instance"></div>
  <div class="fade project col-2 row-3 fragment"
       data-fragment-index="2" alt="Project instance"></div>
  <div class="fade project col-4 row-1 fragment"
       data-fragment-index="2" alt="Project instance"></div>
</div>

<div class="fade-out fragment" data-fragment-index="4">
  <div class="fade flavor col-2 row-1 fragment"
       data-fragment-index="3" alt="Flavor instance"></div>
  <div class="fade flavor col-1 row-3 fragment"
       data-fragment-index="3" alt="Flavor instance"></div>
</div>

<div class="fade instance col-2 row-1 fragment"
     data-fragment-index="4" alt="Flavor instance"></div>

Note:

Different cloud operators will want to support different SLAs
with different workflows.

Which failures to handle?
*   All hosts in an Availability Zone?
*   All instances in a project?
*   All instances of a flavor?
*   Individually selected instances?

**TODO**: replace animated diagram


<!-- .slide: data-state="normal" id="configurability-2" data-menu-title="Configurability (2)" data-timing="60" -->
## Design goal: Configurability (2)

Different cloud operators will want to support different SLAs
with different workflows.

*   Optional use of host reservation to ensure minimum level of redundancy
*   Retry thresholds on recovery of processes and VM instances
*   Configurable workflows?

Note: There is no one-size-fits-all solution to compute HA.


<!-- .slide: data-state="normal" id="upgradability" data-timing="60" -->
# Upgradability

<figure>
    <img alt="Upgrade failed dialog box"
         data-src="images/upgrade-are-failed-2.gif"
         style="width: 90%" />
</figure>

Note: We need easy migration from existing compute HA deployments, so
don't make life hard for (existing customers of) SUSE, NTT, Red Hat,
or anyone else using upstream solution


<!-- .slide: data-state="normal" id="context-aware" data-menu-title="Context-aware recovery" data-timing="60" -->
## Design goal: Intelligent, Context-aware Recovery

*   If `nova-compute` fails, VMs are still perfectly healthy
    but unmanageable
    *   Should they be automatically killed?  Depends on
        the workload.
*   Fault deduplication
    *   VM recovery and host recovery could potentially happen within
        small time window and collide
*   Set host to maintenance mode until recovery is complete
*   Respect ephemeral storage boundaries where applicable


<!-- .slide: data-state="normal" id="performance" data-menu-title="Performance" data-timing="60" -->
## Design goal: Performance

*   Quick response to failures
    *   Notifications on message bus to ensure recovery workflows are
        triggered ASAP (instead of polling to start workflows)
*   Fault prioritization


<!-- .slide: data-state="normal" id="performance" data-menu-title="Conformance" data-timing="60" -->
## Design goal: Conformance to OpenStack standards

*   Python
*   `oslo.*`
*   StackForge
*   gerrit
*   CI with unit tests

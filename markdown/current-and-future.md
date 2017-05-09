<!-- .slide: data-state="section-break" id="current-and-future" data-timing="5" -->
# Current and future work


<!-- .slide: data-state="normal" id="modular" data-timing="30" -->
# Modular architecture

*   <!-- .element: class="fragment" -->
    Key areas identified in previous Design Summits:
    *   <!-- .element: class="fragment" -->
        Host monitoring / recovery
    *   <!-- .element: class="fragment" -->
        VM monitoring / recovery
    *   <!-- .element: class="fragment" -->
        Process monitoring / recovery
*   <!-- .element: class="fragment" -->
    Agreed to split into independent components
*   <!-- .element: class="fragment" -->
    https://etherpad.openstack.org/p/newton-instance-ha


<!-- .slide: data-state="normal" id="specs" data-timing="60" -->
# Specs

[`openstack-resource-agents-specs` repository](https://github.com/openstack/openstack-resource-agents-specs/tree/master/specs/newton/approved)

*   <!-- .element: class="fragment" -->
    Host monitoring
*   <!-- .element: class="fragment" -->
    Host recovery
*   <!-- .element: class="fragment" -->
    VM monitoring
*   <!-- .element: class="fragment" -->
    VM recovery
*   <!-- .element: class="fragment" -->
    `libvirtd` OCF RA
    *   to take action if migration-threshold reached
*   <!-- .element: class="fragment" -->
    `NovaCompute` OCF RA
    *   ditto


<!-- .slide: data-state="normal" id="existing-architecture" data-menu-title="OCF architecture" data-timing="60" -->

<div class="new-architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture"
         data-src="images/OCF-architecture.svg" />
</div>


<!-- .slide: data-state="normal" id="unified-architecture" data-menu-title="Driver-based alerting RA" data-timing="60" -->

<div class="new-architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture"
         data-src="images/unified-architecture.svg" />
</div>

Note:

- Send host failure notifications from multi-evacuate RA to masakari via python-masakari
    - Eliminates need for masakari-hostmonitor
    - No risk of notification getting lost by Pacemaker (stays in attrd until dispatched)
    - No risk of notification getting lost by Masakari (persistent in DB until handled)
- Replace masakari-processmonitor with standard Pacemaker process monitoring


<!-- .slide: data-state="normal" id="unified-architecture-mistral" data-menu-title="Mistral architecture" data-timing="30" -->

<div class="new-architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture"
         data-src="images/unified-architecture+mistral.svg" />
</div>


<!-- .slide: data-state="normal" id="grand-unified-architecture" data-menu-title="Grand unified architecture" data-timing="30" -->

<div class="new-architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture"
         data-src="images/grand-unified-architecture.svg" />
</div>


<!-- .slide: data-state="normal" id="current-work" data-timing="60" -->
# Current work

*   `masakari` packaged in [`rpm-packaging` project](https://review.openstack.org/#/q/%28masakari+OR+masakariclient%29+project:openstack/rpm-packaging)
*   Integration with OCF RA approach in SUSE OpenStack Cloud
*   Finalise specs


<!-- .slide: data-state="normal" id="future-work" data-timing="60" -->
# Future work

### masakari

*   Documentation
*   Recovery method customization
*   Implement Mistral backend driver for `masakari`
*   Ironic support: Make volume boot ironic instances are highly available
*   Submit to Big Tent

### nova <!-- .element: class="fragment" data-fragment-index="1" -->

*   <!-- .element: class="fragment" data-fragment-index="1" -->
    `nova evacuate` API progress could work similar to
    `nova live-migration` progress

<!-- .slide: data-state="section-break" id="current-and-future" data-timing="10" -->
# Current and future work


<!-- .slide: data-state="normal" id="modular" data-timing="40" -->
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


<!-- .slide: data-state="normal" id="specs" data-timing="40" -->
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
    <img alt="OCF RAs with pacemaker_remote"
         class="architecture"
         data-src="images/unified-architecture-01-OCF-only.svg" />
</div>


<!-- .slide: data-state="normal" id="OCF-and-mistral" data-menu-title="OCF + mistral" data-timing="15" -->

<div class="new-architecture">
    <img alt="OCF RAs plus mistral"
         class="architecture"
         data-src="images/unified-architecture-02-OCF-and-mistral.svg" />
</div>


<!-- .slide: data-state="normal" id="OCF-mistral-masakari" data-menu-title="All existing" data-timing="15" -->

<div class="new-architecture">
    <img alt="All 3 existing solutions"
         class="architecture"
         data-src="images/unified-architecture-03-all.svg" />
</div>


<!-- .slide: data-state="normal" id="to-change" data-menu-title="Initial changes" data-timing="15" -->

<div class="new-architecture">
    <img alt="Initial changes"
         class="architecture"
         data-src="images/unified-architecture-04-to-change.svg" />
</div>


<!-- .slide: data-state="normal" id="nova-host-alerter" data-menu-title="nova-host-alerter" data-timing="20" -->

<div class="new-architecture">
    <img alt="Introduce nova-host-alerter"
         class="architecture"
         data-src="images/unified-architecture-05-new.svg" />
</div>

Note:

- Send host failure notifications from multi-evacuate RA to masakari via python-masakari
    - Eliminates need for masakari-hostmonitor
    - No risk of notification getting lost by Pacemaker (stays in attrd until dispatched)
    - No risk of notification getting lost by Masakari (persistent in DB until handled)
- Replace masakari-processmonitor with standard Pacemaker process monitoring


<!-- .slide: data-state="normal" id="no-NovaEvacuate-hostmonitor" data-menu-title="Remove NovaEvacuate and masakari-hostmonitor" data-timing="10" -->

<div class="new-architecture">
    <img alt="Remove NovaEvacuate and masakari-hostmonitor"
         class="architecture"
         data-src="images/unified-architecture-06-no-NovaEvacuate-hostmonitor.svg" />
</div>


<!-- .slide: data-state="normal" id="mistral-integration" data-menu-title="mistral integration" data-timing="10" -->

<div class="new-architecture">
    <img alt="mistral integration"
         class="architecture"
         data-src="images/unified-architecture-07-mistral-integration.svg" />
</div>


<!-- .slide: data-state="normal" id="no-fence_evacuate" data-menu-title="Remove fence_evacuate" data-timing="20" -->

<div class="new-architecture">
    <img alt="Remove fence_evacuate"
         class="architecture"
         data-src="images/unified-architecture-08-final.svg" />
</div>


<!-- .slide: data-state="normal" id="current-work" data-timing="50" -->
# Current work

*   `masakari` packaged in [`rpm-packaging` project](https://review.openstack.org/#/q/%28masakari+OR+masakariclient%29+project:openstack/rpm-packaging)
*   Integration with OCF RA approach in SUSE OpenStack Cloud
*   Finalise specs


<!-- .slide: data-state="normal" id="future-work" data-timing="80" -->
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

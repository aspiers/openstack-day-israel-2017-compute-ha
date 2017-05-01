<!-- .slide: data-state="section-break" id="current-and-future" data-timing="5" -->
# Current and future work


<!-- .slide: data-state="normal" id="modular" data-timing="60" -->
# Modular architecture

*   Key areas identified in previous Design Summits:
    *   Host monitoring / recovery
    *   Process monitoring / recovery (agreed to use pacemaker_remote and openstack-resource-agents)
        *   Needs libvirtd OCF RA to take action if migration-threshold reached
        *   NovaCompute OCF RA needs spec/work
    *   VM monitoring / recovery
*   Agreed to split into independent components


<!-- .slide: data-state="normal" id="specs" data-timing="60" -->
# Specs

[`openstack-resource-agents-specs` repository](https://github.com/openstack/openstack-resource-agents-specs/tree/master/specs/newton/approved)


<!-- .slide: data-state="normal" id="unification" data-timing="60" -->
# Unification

*   Package masakari in [`rpm-packaging` project](https://review.openstack.org/#/q/%28masakari+OR+masakariclient%29+project:openstack/rpm-packaging)

**TODO**: include architecture diagram

Note:

- Send host failure notifications from multi-evacuate RA to masakari via python-masakari
    - Eliminates need for masakari-hostmonitor
    - No risk of notification getting lost by Pacemaker (stays in attrd until dispatched)
    - No risk of notification getting lost by Masakari (persistent in DB until handled)
- Replace masakari-processmonitor with standard Pacemaker process monitoring


<!-- .slide: data-state="normal" id="Demo" data-timing="60" -->
# Demo

If I can get it working in time!


<!-- .slide: data-state="normal" id="future" data-timing="60" -->
## Future work

*   Documentation for `masakari`
*   More flexible configuration
*   Implement Mistral backend driver for `masakari`
*   `nova evacuate` API progress could work similar to
    `nova live-migration` progress

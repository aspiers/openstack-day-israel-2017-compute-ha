<!-- .slide: data-state="section-break" id="FOSS-solutions" data-timing="10" -->
# Existing F/OSS solutions


<!-- .slide: data-state="normal" id="ocf-pros-cons" data-menu-title="OCF RA pros and cons" data-timing="40" -->
## Pacemaker + `NovaCompute` / `NovaEvacuate` RAs

### Pros <!-- .element: class="fragment" data-fragment-index="1" -->

*   <!-- .element: class="fragment" data-fragment-index="1" -->
    Ready for production use *now*
*   <!-- .element: class="fragment" data-fragment-index="2" -->
    Commercial support available
*   <!-- .element: class="fragment" data-fragment-index="3" -->
    RAs [upstream in `openstack-resource-agents` repo](https://github.com/openstack/openstack-resource-agents/tree/master/ocf)

### Cons <!-- .element: class="fragment" data-fragment-index="4" -->

*   <!-- .element: class="fragment" data-fragment-index="4" -->
    Known limitations (not bugs):
    *   Only handles failure of compute node, not of VMs, or `nova-compute`
    *   Some corner cases still problematic, e.g. if `nova` fails during recovery


<!-- .slide: data-state="blank" id="SOC-demo" class="full-screen" data-menu-title="SOC demo" data-timing="25" -->
<iframe data-src="https://www.youtube.com/embed/OrsiP86rGM8"
        frameborder="0" allowfullscreen></iframe>


<!-- .slide: data-state="normal" id="about-masakari" data-timing="30" -->
## Masakari

*   https://launchpad.net/masakari
*   https://wiki.openstack.org/wiki/Masakari
*   <!-- .element: class="fragment" data-fragment-index="1" -->
    [Current Stable Release: stable/ocata](https://github.com/openstack/masakari/tree/stable/ocata)
*   <!-- .element: class="fragment" data-fragment-index="2" -->
    Enhanced recovery engine supports customizable recovery workflows
*   <!-- .element: class="fragment" data-fragment-index="3" -->
    Retry for failed workflows
*   <!-- .element: class="fragment" data-fragment-index="4" -->
    API
*   <!-- .element: class="fragment" data-fragment-index="5" -->
    Backed by DB / MQ
*   <!-- .element: class="fragment" data-fragment-index="6" -->
    Conformance to OpenStack standards


<!-- .slide: data-state="normal" id="mistral" data-menu-title="Mistral" data-timing="40"-->
## Mistral recovery workflow

<div>
    <img style="height: 80%; left: 55%; position: absolute" alt="Recovery workflow"
         data-src="images/workflow.svg" />
</div>

*   Workflow as a service
*   <!-- .element: class="fragment" -->
    Enables user to create any workflows
*   <!-- .element: class="fragment" -->
    PoC for compute host recovery:
    *   https://github.com/gryf/mistral-evacuate


<!-- .slide: data-state="normal" id="comparison" data-menu-title="Comparison" data-timing="60"-->
## Comparison matrix

<table class="waffle" cellspacing="0" cellpadding="0">
  <thead>
    <tr>
      <th class="criterion-class">
        <div></div>
      </th>
      <th class="criteria" />
      <th>OCF Agents</th>
      <th>Masakari</th>
      <th>Best of breed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="criterion-class policy" rowspan="2">
        <div>Policy</div>
      </td>
      <td class="criteria">Configurable scope</td>
      <td class="no">No</td>
      <td class="maybe">By instance</td>
      <td class="yes">Planned</td>
    </tr>
    <tr>
      <td class="criteria">Configurable retries</td>
      <td class="no">No</td>
      <td class="yes">Done</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criterion-class resilience" rowspan="4">
        <div>Resilience</div>
      </td>
      <td class="criteria">Host monitoring</td>
      <td class="yes">Pacemaker</td>
      <td class="no">Custom</td>
      <td class="yes">Pacemaker</td>
    </tr>
    <tr>
      <td class="criteria">Process monitoring</td>
      <td class="yes">Pacemaker</td>
      <td class="no">Custom</td>
      <td class="yes">Pacemaker</td>
    </tr>
    <tr>
      <td class="criteria">Handles control plane failures</td>
      <td class="maybe" colspan="3">Needs improvements in `nova`</td>
    </tr>
    <tr>
      <td class="criteria">Monitoring of VM's (external) health</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criterion-class recovery" rowspan="6">
        <div>Recovery</div>
      </td>
      <td class="criteria">Operable via API</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criteria">Host reservation</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criteria">Failover segments</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criteria">Configurable workflows</td>
      <td class="no">No</td>
      <td class="maybe">Spec drafted</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criteria">Disable failed `nova‑compute`</td>
      <td class="no">No</td>
      <td class="yes">Yes</td>
      <td class="yes">Yes</td>
    </tr>
    <tr>
      <td class="criteria">Fully parallel workflow</td>
      <td class="no">No</td>
      <td class="yes">Taskflow</td>
      <td class="yes">Yes</td>
    </tr>
  </tbody>
</table>

Note:

*   Left column groups capabilities into 3 categories

Common functionality:
*   Tolerate simultaneous failures in compute / control planes
*   Retry failed evacuations
*   Monitor node and hypervisor health

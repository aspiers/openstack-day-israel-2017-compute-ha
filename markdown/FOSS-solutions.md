<!-- .slide: data-state="section-break" id="FOSS-solutions" data-timing="5" -->
# Existing F/OSS solutions


<!-- .slide: data-state="normal" id="ocf-architecture" data-menu-title="OCF RAs" class="architecture" data-timing="90" -->
## `NovaCompute` / `NovaEvacuate` OCF agents

<div class="architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture fragment fade-out" data-fragment-index="1"
         data-src="images/standard-architecture.svg" />

    <span class="fragment" data-fragment-index="1">
        <img alt="OCF RA architecture"
             class="OCF-RA architecture fragment fade-out" data-fragment-index="2"
             data-src="images/OCF-RA-architecture.svg" />
    </span>

    <span class="fragment" data-fragment-index="2">
        <img alt="OCF RA failure domains"
             class="OCF-RA architecture"
             data-src="images/OCF-RA-failure-domains.svg" />
    </span>
</div>

Note:
*   Custom OCF Resource Agents (RAs)
    *   Pacemaker plugins to manage resources
*   Custom fencing agent (`fence_compute`) flags host for recovery
*   `NovaEvacuate` RA polls for flags, and initiates recovery
    *   Will keep retrying if recovery not possible
*   `NovaCompute` RA starts / stops `nova-compute`
    *   Start waits for recovery to complete


<!-- .slide: data-state="blank" id="SOC-demo" class="full-screen" data-menu-title="SOC demo" data-timing="15" -->
<iframe data-src="https://www.youtube.com/embed/OrsiP86rGM8"
        frameborder="0" allowfullscreen></iframe>


<!-- .slide: data-state="normal" id="ocf-pros-cons" data-menu-title="OCF RA pros and cons" data-timing="30" -->
## `NovaCompute` / `NovaEvacuate` OCF agents

### Pros

*   Ready for production use *now*
*   Commercial support available
*   RAs [upstream in `openstack-resource-agents` repo](https://github.com/openstack/openstack-resource-agents/tree/master/ocf)

### Cons

*   Known limitations (not bugs):
    *   Only handles failure of compute node, not of VMs, or `nova-compute`
    *   Some corner cases still problematic, e.g. if `nova` fails during recovery


<!-- .slide: data-state="normal" id="masakari-architecture" class="architecture" data-timing="120" -->
## Masakari architecture

<div class="architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture fragment fade-out" data-fragment-index="1"
         data-src="images/standard-architecture.svg" />

    <span class="fragment" data-fragment-index="1">
        <img alt="masakari architecture"
             class="masakari architecture fragment fade-out" data-fragment-index="2"
             data-src="images/masakari-architecture2.svg" />
    </span>

    <span class="fragment" data-fragment-index="2">
        <img alt="masakari process failure"
             class="masakari architecture fragment fade-out" data-fragment-index="3"
             data-src="images/masakari-processdown.svg" />
    </span>

    <span class="fragment" data-fragment-index="3">
        <img alt="masakari vm failure"
             class="masakari architecture fragment fade-out" data-fragment-index="4"
             data-src="images/masakari-vmdown.svg" />
    </span>

    <span class="fragment" data-fragment-index="4">
        <img alt="masakari host failure"
             class="masakari architecture"
             data-src="images/masakari-hostdown.svg" />
    </span>
</div>

Note:

*   Similar architectural concept, different code
    *   Recovery handled by separate controller service
    *   Persists state to database
*   Monitors for [3 types of failure](https://github.com/ntt-sic/masakari/blob/master/docs/evacuation_patterns.md):
    *   compute node down
    *   `nova-compute` service down
    *   VM down (detected via `libvirt`)


<!-- .slide: data-state="normal" id="about-masakari" data-timing="30" -->
## About Masakari

*   [Masakari Wiki](https://wiki.openstack.org/wiki/Masakari)
*   [Current Stable Release: stable/ocata](https://github.com/openstack/masakari/tree/stable/ocata)
    * Enhanced recovery engine to supports customizable recovery patterns
    * Retry for failed recovery workflows
    * Conformance to OpenStack standards


<!-- .slide: data-state="normal" id="mistral" data-menu-title="Mistral" data-timing="30"-->
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


<!-- .slide: data-state="normal" id="comparison" data-menu-title="Comparison" data-timing="30"-->
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

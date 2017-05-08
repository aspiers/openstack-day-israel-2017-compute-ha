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


<!-- .slide: data-state="blank" id="SOC-demo" class="full-screen" data-menu-title="SOC demo" data-timing="200" -->
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


<!-- .slide: data-state="normal" id="masakari-architecture" class="architecture" data-timing="50" -->
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


<!-- .slide: data-state="normal" id="about-masakari" data-timing="20" -->
## About Masakari

*   [Masakari Wiki](https://wiki.openstack.org/wiki/Masakari)
*   [Current Stable Release: stable/ocata](https://github.com/openstack/masakari/tree/stable/ocata)
    * Enhanced recovery engine to supports customizable recovery patterns
    * Retry for failed recovery workflows
    * Conformance to OpenStack standards
*  Work in progress
    * Documentation
    * Recovery method customization and Mistral Integration to support more drivers
    * Ironic support: Make volume boot ironic instances are highly available


<!-- .slide: data-state="normal" id="masakari-pros-cons" data-timing="30" -->
## Masakari analysis

### Pros

*   Monitors VM health (externally)
*   More sophisticated recovery workflows
*   API provides operability
*   Conforms to OpenStack standards

### Cons

*   Duplicates Pacemaker's host monitoring and process management

Note:
- Failing `nova-compute` service will be disabled
- Basically only uses Pacemaker as monitoring / fencing service
- Waits 5 minutes after fencing


<!-- .slide: data-state="section-break" id="mistral-intro" data-timing="10" -->
# Mistral-based solution


<!-- .slide: data-state="normal" id="mistral" data-menu-title="Mistral" data-timing="60"-->

<div>
    <img style="height: 80%; left: 55%; position: absolute" alt="Simple mistral workflow"
         data-src="images/mistral-simple-workflow.svg" />
</div>

## Mistral
*   Workflow as a service
*   Enables user to create any workflows
*   May be expansible with custom action
*   Workflow execution may be triggered by:
    *   events from ceilometer
    *   at a certain time (cloud cron)
    *   on demand (API call)

Note:
Next solution is based on mistral. Before I proceed with explaining this solution, I would like to tell you what Mistral is.
As you already read, mistral is 'workflow as a service' service. By using it, you can define a set of tasks and connect them into logical graph. For each task, you can define what to do in case of failure or success. Moreover, if predefined tasks are not enaugh for you, you can write your own actions and plugin them into mistral. Those actions are literaly python class, so you can do anything inside of them.
Once workflow is created, it can be triggered by various ways. Ceilometer, time, or, what is used in instance-ha mistral based solution, on demand via API.


<!-- .slide: data-state="normal" id="mistral-architecture" data-menu-title="Mistral" class="architecture" data-timing="60"-->
## Mistral-based resurrection workflow

<div class="architecture">
    <img alt="Standard architecture with pacemaker_remote"
         class="architecture fragment fade-out" data-fragment-index="1"
         data-src="images/standard-architecture.svg" />

    <span class="fragment" data-fragment-index="1">
        <img alt="mistral architecture"
             class="mistral architecture fragment fade-out" data-fragment-index="2"
             data-src="images/mistral-architecture.svg" />
    </span>

    <span class="fragment" data-fragment-index="2">
        <img alt="mistral failure domains"
             class="mistral architecture"
             data-src="images/mistral-failure-domains.svg" />
    </span>
</div>


<!-- .slide: data-state="normal" id="mistral-summary" data-menu-title="Mistral summary" data-timing="40"-->
## Mistral-based resurrection workflow

*   https://github.com/gryf/mistral-evacuate

### Pros

*   In line with upstream OpenStack strategy
*   Clean, simple approach
*   Potential for integration with Congress for policy-based workflows

### Cons

*   Still experimental code; not yet usable by most
*   Mistral resilience WIP

Note:
Reuses components rather than adding yet another project
We can make different decision based on failure type using congress
Marking vms as pets
Describe problem with mistral HA


<!-- .slide: data-state="normal" id="mistral-workflow" data-menu-title="Mistral workflow" data-timing="30"-->
## Evacuate workflow

<div>
    <img style="height: 80%; margin-left: 30%" alt="Evacuate Workflow"
         data-src="images/workflow.svg" />
</div>

Note:
Whole workflow should start with nova mark-host-down if fencing was before
repeat is not forever


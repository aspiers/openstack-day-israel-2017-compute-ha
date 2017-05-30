<!-- .slide: data-state="section-break" id="compute-vs-control" data-timing="5" -->
# Compute plane HA
## vs.
# control plane HA


<!-- .slide: data-state="normal" id="control-plane" class="diagram-and-list" data-timing="20" -->
## Typical HA control plane

<div class="diagrams">
    <img class="services" data-src="images/services-cluster.svg"
         alt="HA services cluster" />
    <img class="db-mq" data-src="images/DB-MQ-cluster.svg"
         alt="database and message queue cluster" />
</div>

*   <!-- .element: class="fragment" -->
    Automatic restart of controller services
*   <!-- .element: class="fragment" -->
    Increases uptime of cloud

<div class="solved stamp fragment">
    <p class="solved">SOLVED</p>
    <p class="mostly fragment">(mostly)</p>
</div>

Note:
- Active / active API services with load balancing
- DB + MQ either active / active or active / passive
- [HAProxy](http://www.haproxy.org/) distributes service requests
- [Pacemaker](http://clusterlabs.org/) monitors and controls nodes and services
- These days, to a large extent this is a solved problem!

[`neutron` HA is tricky](https://youtu.be/vBZgtHgSdOY), but out of the
scope of this talk.


<!-- .slide: data-state="normal" id="compute-failure" data-menu-title="Compute failure" data-timing="15" -->
## If only the control plane is HA …

<img class="arch" alt="control/compute architecture" data-src="images/architecture.svg" />
<img class="fragment bang" alt="compute node explosion!" data-src="images/explosion.svg" />

Note:
The control plane on the LHS is HA, but VMs live on the RHS,
so what happens if one of the compute nodes blows up?  That's
the topic of the rest of this talk!

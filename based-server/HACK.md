### Obsidian client
### AI topic modeling
- 
- sort them based off similarity
- put them into groups
## Server 
- Store the master copy of the shared knowledge base
- CRDT
- create links
- Propogate tags and links.

Strongly consistent replication:

In this model, the replicas coordinate with each other to decide when and how to apply the modifications. This approach enables strong consistency models such as serializable transactions and linearizability. However, waiting for this coordination reduces the performance of these systems; moreover, the CAP theorem tells us that it is impossible to make any data changes on a replica while it is disconnected from the rest of the system (e.g. due to a network partition, or because it is a mobile device with intermittent connectivity).

Optimistic replication:

In this model, users may modify the data on any replica independently of any other replica, even if the replica is offline or disconnected from the others. This approach enables maximum performance and availability, but it can lead to conflicts when multiple clients or users concurrently modify the same piece of data. These conflicts then need to be resolved when the replicas communicate with each other.
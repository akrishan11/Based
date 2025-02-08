## allocated
- Take those values and put them into ram.
- If it gets too big, we may throw on RAM → Disk.
- - KBs = Chip
- MBs = RAM
- GBs = lose, don't do Disk

---

### Page 2

**A for effort!
- - RAM is limited, we must take things I/O as necessary, loading and storing as we go.
- **

(Diagram showing stack, heap, and memory allocation in RAM)

- Just grab what you need!
- Should be all good if you need something you don't have in RAM.
- into RAM, but the instruction lies at `0x2004` & `0xFFFFF8`.
- What do we put them at for RAM?
- `0x2004` is valid for RAM but `0xFFFFF8` does not fit, so we must relocate.
- Need a memory scheduler for this also.
- Heap & RAM though, there are gaps!!
- **MEMORY**

- RAM is limited.
- - Calculations:
  - 1GB of RAM requires \( 2^{30} \) addressable units.
- - OS needs to check whether to load the page into RAM or replace an existing page.

## collisions
- Management of CPU time - Scheduling.
- What am I scheduling.
- Chose amongst all of our jobs, which one do we want to run next ➔ this is the ==scheduling algorithm ==.
- When does the scheduling algorithm run.
- - Banker’s algorithm: If anyone asks for resources, always have enough to satisfy them.
- - Bankers Algorithm: based off how savings and loans used to work.
- - Keep around a small amount of income so that if people come in and ask for their money, you have it.
- - This is essentially a scheduling algorithm?

## cycles
- - Collision should happen only when necessary, not prescriptive, we want descriptive.
- Mutual exclusion and preemptions are properties of resources.
- Mutually exclusive things cannot be shared.
- - Mutually exclusive: Cannot be shared, cannot be preempted (the exclusive access cannot be taken away while you are still in it.)
- - Make a graph by connecting who is depending on each other.
- - Atomic could be a synonym.
- - Collisions (e.g., pigeonhole principle) are inevitable.

## deadlocks
- If you hear which of these is best "it depends."
- Depends on what?
- 2.
- 3.
- 2.
- 3.
- 2.
- 3.
- 2.
- If only...
- Funsies!
- Limited.
- 2.
- 3.
- !
- 2.
- 3.
- 2.
- 3.
- s

## depends
- - The bounds of partitions must be stored in hardware registers, must be saved, and restored as part of the process.
- - **Fixed Partition**: Divide up RAM into chunks of fixed size; allocate new processes to a partition.
- - Partition size probably won’t change with the size of the system, but at least we are sharing now.
- - Partitioning is more difficult than it sounds: **How many partitions?
- - Checking bounds for RAM partitions is hard!
- Still sort of partitions, but a little less fixed.
- ** With fixed partition, at least we moved in between execution.
- Much worse than batch partitioning.
- Maybe fixed partitions?
- We can make partitions for processes to share, but their size can’t change while the computer is on.
- For partitions, how many slices should we make?
- - A disk burner is not
	- Only 1 disk at a time.
- #### Imagine fixed partitions
- We can divide up RAM (partition) into chunks of fixed size and allocate new processes to one of these partitions.
- - Partition size probably can’t change while the system is on.
- - More partitions: each one is smaller
- larger partitions: you have less of them overall.
- - How do you assign jobs that want to run, to specific partitions.
- - you don't want to give a big partition to a small process
	- Later you might get a big process that needs the big partition.
- - Know the bounds of the current partition and check.

## future
- How do you call a function that is not in your address space.
- that deals with an address (all of them basically).
- HW is still using the old address!!
- Much easier to use BASE as a base, and treat all addresses as relative to base.
- Now, our addresses are kept!!
- Might just use base again.
- - How do we know if an address is out of bounds?

## hash
- Sparse graph!
- - Need a mechanism (hashing or similar) to map VAs to PAs.
- - We want prescriptive mapping, not random or overly dependent on free space.
- - **Constraints**:
  - **Small and Fast**: Mapping must be fast and efficient to avoid becoming a bottleneck.
- ---

### **Virtual Address Space (VAS)**

- **Exploiting Sparsity**:
  - Linked lists (or similar structures) can be used for sparse VAS mappings.
- - Efficient for sparse mappings by avoiding leaves when possible.
- **Sparse Mapping**:
   - Many VAs may not correspond to active PAs.
- - Sparse mappings mitigate this by storing only necessary translations.

## interrupt
- Checking registers every cycle, throwing exception if kept.
- (DFS search to look for cycles.
- - Loops imply a backedge - a cycle.
- If the OS prevents moving ‘downwards’ in the graph, it will reject cycles.
- - you could use DFS to detect if you have a cycle, because circular wait is a condition for deadlock.
- - Why does DFS detect cycles but BFS does not?

## kernel
- 1550 Lec 6
When we go back into user mode from kernel mode
Real time performance in computing system can be calculated by determining which implementation performs
the fewest context switches.
- What does it mean that the operating system is overhead
If the OS starts writing to the same registers as the userspace program, it will corrupt that data.
- Before we need to perform a context switch.
- Is there a convenient place to put the information stored during a context switch.
- The context is associated with the process.
- Doesn't really matter if its in the "OS
stack" or the "Process stack"
Buffered input avoids the cost of having to do context based system calls.
- Context switches are expensive ➔ They have been designed to become as cheap as possible.
- If you inject code into user space, we can only do the stuff that a user can do.
- The context switch is when we calculate the choice of when to start running.
- Why are context switches expensive?
- - **This is too much work to solve via OS; would require a context switch on each instr.
- - If you actually made a system based off global numbering, it would be a mid operating system to write code in.
- If a process
wants to use memory outside of its bounds, we deny it
```

```
In this approach, every instruction that a program runs, a context switch
occurs just to check if the program is in bounds.
- Some instructions context
switch more than once because they have default context switches already
associated with them (for example, sw and lw).

## lists
- Walking a linked list and choosing a particular node.
- How big will they be?
- `int in = 0, out = 0, count = 0`: all = 0.
- - Array!
- Linked List!
- Ship of Theseus!
- Where will it be?
- - How would we number this?!
- - Several solutions to this problem.
- - Time complexity = \( O(2) \) for this example.
- - Issues:
    - Linked lists introduce \( O(n) \) traversal overhead.
- - Better alternatives: Balanced trees (\( O(\log n) \)).

## mappings
- - Is unable to address preemption or hold/wait.
- **Hold and Wait**: A process gains a mutually exclusive resource, holds it, then attempts to gain another, waiting if failed.
- **Circular Wait**: Process A is waiting for a resource held by B in the CR while D is waiting for A’s resource.
- ---

### Page 4

**Circular Wait**

- Processes (B holds 2), (C wants 1) → (A wants 2), (B holds 2), possibility to deadlock, ID by order (accessed)

- Sometimes, the best option is to leave things alone.
- - Mutual exclusion
- Hold and wait
- No preemption
- Circular wait
  - Example: Process A holds the lock and is sleeping, and process B needs the lock before it can wake process A up.
- - This could lead to circular wait.
- Process A is waiting for a resource held by Process B, which is waiting for a resource held by process A.
- - Can’t make hold and wait or no premption always false.
- - circular wait requires two processes running at the same time
### What is preemptable
- Taking a resource that a process currently has and giving it to someone else.
- - Circular wait is an interesting condition
- Loop is defined by presence of a "back edge"
	- Go somewhere and reach back to where you were before
- How does this "ability to go to a resource numbered lower then the resource that your process currently has" prevent, deadlock/race conditions.

## memory
- and that
data will not be useful anymore.
- What do we do if we don't have enough values to store the register.
- Managed as a stack.
- Von Neumann, instructions in memory.
- You cant too bad.
- If we have fewer places we can make mistakes its more likely we got it right.
- Modularity.
- Little pieces with individual tasks.
- - because memory is far and we have to do very many of them.
- - Almost always, mutual exclusion will apply.
- **Mutual Exclusion**: Resource can only be held by one process at a time.
- ---

### Producer/Consumer Problem

- From this point forward, we are assuming our chosen solution works.
- - **Producer**:
  ```c
  while(1) {
      if (count == N) sleep();
      buffer[in] = …;
      in = (in + 1) % N;
      count++;
      if (count == 1) wakeup(consumer);
  }
  ```
- **Consumer**:
  ```c
  while(1) {
      if (count == 0) sleep();
      out = (out + 1) % N;
      count--;
      if (count == N-1) wakeup(producer);
  }
  ```
- **Shared State**

  1.
- `int buffer[N]`: Communication channel between the producer and consumer.
- Sorry.
- E for effort?
- This is called **Overlay.
- Also switch over activation records, etc., keeping what you STILL NEED!!
- - Much smaller RAM overhead per process!
- Each piece comes together to create our full program in smaller pieces.
- **Overlay sucks** though, etc... Can we automate?
- (Diagram of 4GB virtual address space and 1GB physical RAM)

- I imagine we want to load some part of program (stack, instructions, etc.)
- Every instruction throws some pointer twice (TBL).
- This sucks.
- Registers, stack is also pretty, just used whatever we like.
- - **External Frag:** When we have odd sized chunks (tiny), those spread out.
- - **Internal Frag:** When our chunks are too big, wasting space on allocation 4KB Page.
- Why go batsh for something non-game-changing?
- It is necessary, under Von Neumann architecture.
- **Divisions:**

- How do we divide it?
- (Diagram showing memory layout)

**Absolute:**

- J-Type and I-Type instructions
- J label → `$PC` ← label << 1 (program counter)
- `BNC` same idea ← `$PC` ← `$PC+1(label << 2)`

**THIS** is scary, `J` takes **ABSOLUTE** could be good for relocating to take a definite address.
- Achieving mutual exclusion of critical region: resource.
- **

- (Example: What does it mean to preempt the printer?)
- - We can take away CPU time but we can’t take away a printer.
- Same with a disc burner, it cannot be interrupted mid burning.
- Why can’t we use it at the same time?
- - Ignore it.
- - Kill it if there’s no good options.
- - Avoid it.
- 😭
- Prevent
  - Make at least one of the four conditions always false.
- - Mutual exclusion via spooling.
- What happens when one queue is very slow, and the others go through fast?
- - "Resource" is exclusive access to critical region

- Our resource has to be mutually exclusive
	- If one process has the resource no other process can have it.
- - If the process sleeps in the critical region it would depend on something else to wake them up
- one process enters the critical region and goes to sleep.
- - It cannot because the other process never left the critical region.
- - A printer is not 
	- You cannot stop printing halfway through and start printing something else.
- - when you buy a printer it is preemptable and it cannot change.
- - x++ is not idempotent.
- - We don't want the operating system to kill processes.
- Prevent
	-  Make at least one of the four conditions always false
	-  Probably mutual exclusion via **spooling**.
- - This prevents the cycle in our two processes, and prevents race conditions?
- - Von Neumann requires us to put code and data into RAM.
- - It must be split into more pieces.
- - Take RAM and split it up into 300 pieces in order to maintain a high degree of multiprogramming
	- Von Neumann says that every process needs to be in RAM.
- How do you know what size memory block a process will have.
- - When could it move?
- This is unusable due to poor performance
To make this approach actually usable, weʼd have to add two registers to
our physical CPU architecture since that would be the only way we have
a fast enough way to check memory bounds.
- ## Free Space Tracking

Bitmap
Free vs in-use are 2 mutually exclusive options
Store 1 bit per “chunkˮ

```
Process A gets paused in step 4
```

Where is this data structure stored?
- In the same place as the memory it is managing
Somewhere in RAM or Disk based on what space we are tracking
If we assume that the smallest addressable unit is a byte and we want to
track free memory at the smallest unit:
1 bit needed for every byte.

## os
- Architecting an OS
A Space - an enumeration of all possible choices/decisions/designs
How do we organize the operating system to make it do the things that we need it to do.
- Need to know what programs are running.
- What do I run now.
- the union of all
of the pieces I need to run an operating system.
- A lot of the operating system work is unprivileged work.
- Most of them are running in user space.
- What does it mean that the operating system is overhead
Any resource taken by the OS cannot be used by what we really want to run.
- It is a limited resource, like CPU time.
- It is volatile (loses content when power is lost).
- It is necessary for all programs to do their work, despite the associated cost that comes with it.
- ---

### Degree of Multiprogramming

- The more I/O-bound our workload, the more processes we need to scatter the CPU’s time.
- - The OS goal is to use all resources there is a demand for.
- - Example:
    - At 80% CPU-bound -> 3 processes.
- - At 20% CPU-bound -> 10 processes.
- - If we are preempted in the CR, the resource we are giving is CPU time.
- It is volatile.
- Check ALL the time CPU!
- Hardware devices may also be resources.
- The CPU.
- What about the costs vs benefits?
- The more IO-bound our workload, the more processes we need to run to saturate the CPU’s time.
- The OS acts as a third party.
- - is a limited resource
	- it is volatile has an associated cost to it, but its needed form programs to do their work.
- - In reality, you have 300 programs, and basically no CPU utilization.

## ostrich
- Pages?
- - Multi-Level Page Tables (MLPT) are a more practical solution.
- ---

### **Multi-Level Page Table Explanation**
- Example: \( 4 \text{GB} \) Virtual Address Space.
- **Frame Size**:
   - Larger frames reduce page table size but increase fragmentation risk.
- - Need to balance between frame size and page table efficiency.
- - **Page Table Design**:
  - Goal: Minimize RAM usage while maintaining fast access.
- - Frame size affects table size and must align with system constraints.

## partitioning
- In a monolithic kernel all of the parts are glued together into what we call the operating system.
- Smaller kernel is referred to as the microkernel.
- Exo-kernel smaller kernel by virtue of pushing out functionality that does not need to be in the kernel.
- Drawback of monolithic kernel.
- The monolithic kernel is more resource efficient.
- There is an argument that the microkernel/exokernel is actually larger.
- In the microkernel/exokernal.
- The kernel is used as an intermediary so different parts of the kernel cannot directly
communicate.
- Monolithic kernel has the opportunity to deduplicate work.
- Modifying the kernel
Building a kernel is not a trivial thing.
- When the OS crashes you need to initialize the system
Linux is very well architected in spite of being a monolithic kernel.
- Hybridize the microkernel.
- If you do an exploit, all of the code is part of the same kernel, so you have access to the whole kernel.
- The entire kernel is vulnerable
By making the kernel smaller its less likely that you have something with a mistake in it.

## preemptable
- It could be stored in the outgoing process address space.
- It just
needs to be somehow associated with the processes address space.
- **
  - If you code with absolute addresses, you must ensure you stay within your partition.
- **Issues:**

- Relocation: Moving in/out is a lot... is our address okay?
- ---

### Page 3

- **Relocation:** Idea process - changing location in memory over time.
- **Relocation!!
- #### Relocation Problem
- Absolute addresses, create problems between executions, if we've moved.
- This is
unsafe and could be abused by malicious attackers

```
Relocation  The memory a process is allocated gets changed over time.
- The
relocation problem is the issue of a program not expecting this move and using
a memory address that mightʼve belonged to it in the past, but does not
anymore
How do we solve these problems:
For protection, we set up bounds for every memory region.
- To solve the relocation problem, we must use relative memory addresses
over absolute ones.
- This approach has a multitude of problems:
Protection and Relocation have been reintroduced
A program can be brought back from memory and might try to access a
memory address that is no longer valid for it
Dynamic allocation becomes more difficult because we donʼt know the exact
amount of memory a process will need
How do we keep track of what memory is free and what is in use?

## processes
- SW to store in memory.
- ### Memory Management (RAM)

- **We manage RAM because...**

  1.
- Though computers are ultra-powerful, ultimately they are finite.
- - **Exclusive Access**
  - Once upon a time, we didn’t have enough RAM to share.
- - Thus, every program had all of the RAM (at least what was leftover after the OS used what it needed) to itself.
- - None of the issues associated with **how we spent the first portion of this course addressing** would exist if we didn’t have to share the RAM.
- - The more processes we need to run, the more we must share RAM.
- Memory Management

We need to manage memory because there’s only so much of it.
- The more processes we need to run, the more we must share RAM.
- END OF MANAGING THE CPUS TIME
# Memory management
- Why do we manage memory (RAM)?
- - Every time we build a new type of computer system, we find new ways of using RAM.
- - Under the assumption that the demand for RAM, is greater than its supply.
- - 1 process in 1 RAM, we can do whatever we want.
- - The more IO-bound our workload, the more processes we need to run to saturate the CPU’s time
- The more processes we need to run, the more we must share RAM.
- - Should reside on-chip because off-chip solutions would slow down access speeds.

## pthreadcondwaitcondition
- I am interested in p2p systems, what is my route to learning/understanding them.
- Thus, we wish to share it.
- - Inevitably we must know what is free & what is not.
- But we said we shouldn’t do this!
- Need to know what resources they need and when, which is impossible because we can’t tell the future!
- - Problematic because we do not know the future.

## ram
- **

---

### Options for Handling Deadlock

1.
- **Detect and Recover**: Too late, no good options.
- **Avoidance**: The principle that deadlock is possible, but we will ensure we won’t cause it.
- - Requires knowing future behavior of programs (impossible in dynamic systems), or else it devolves into better scheduling (which is almost guaranteed deadlock-free).
- **Prevent**: Deadlock is probably “impossible” - a nightmare to implement or design around.
- - At least 1/4 deadlock conditions always false.
- ---

### Four Conditions for Deadlock

1.
- - Moving producer/consumer into the OS does not directly solve our issue of deadlock directly.
- - Deadlock is rare!
- Want to bake it into the CPU, base & limit registers to work against
November 11th, 2024

CS1550 Notes

**Deadlock Conditions:** When these four things occur, deadlock is occurring.
- Resources are involved in deadlocks.
- - By making a deadlock, we defined the CPU as unpreemptive.
- What could an OS do about deadlocks?
- - Detect and recover.
- If there’s a cycle, there’s a deadlock if they’re both blocked because of each other.)
- - Requires knowing future behavior of a program otherwise devolves into batch schedule (already deadlock free.)
- - If it’s rare, sometimes the best course of action is to do nothing at all.
- # Deadlock review
- **Mutual Exclusion**
- **Hold and Wait**
- **No** **preemption**
- **Circular** **wait**

- Last couple of weeks, deadlock is a potential result of race conditions
- Trying to fix race conditions can cause deadlock.
- - Deadlock can occur because of critical regions
	- A printer is mutually exclusive.
- - If the resources are not preempt-able, deadlock could occur.
- - Just this does not cause deadlock
- Why are critical regions involved in deadlock?
- - Ive entered the critical region
- I go to sleep
- That is not deadlock
- When another process wants to enter the critical region.
- - Hold and wait programs could get into a deadlock.
- ### What does the OS do about deadlock
- Idempotent: repeatable without side affects.
- Detect and recover
	 - Too late, no good options.
- Avoid
	-  Requires knowing future behavior of a program otherwise devolves into batch schedule (already deadlock free)
4.
- - Avoidance says, deadlock could still happen but we are gonna try very hard to make sure it not happen.
- - Prevention, deadlock is mathematically/provably impossible to occur.
- - Batch schedules are already deadlock free.
- - Databases can end up in deadlock
	- Databases use two phase locking
		- Aquire all of your resources in phase1
		- Move one to phase 2 where you do what you want.
- - If deadlock is rare and the solution is rebooting your computer
	- And rebooting your computer happens more often then deadlock.
- - Just do nothing about deadlock, because its uncommon
- Sometimes the solution is worse then the problem.
- - You haven't seen that many deadlocks.
- - It is possible to have a deadlock because of a lack of a number of resources (resource acquisition).
- ## Questions
- Look more specifically at instances where deadlock can occur
- Look into database deadlocks and two phase locking.

## reboot
- **Ignore**: Ostrich Algorithm.
- Ostrich Algorithm, pretend like it didn’t happen.
- - Ostrich algorithm: Ignore a problem and pretend its not there
 1.
- Ignore
	 - Ostrich algorithm, pretend like the problem didn't happen.
- use ostrich algorithm.
- - The greed of "one instruction" infinite loop is called "live-lock"
- Lol what is the runtime of the ostrich algorithm.

## resources
- Table indexed by VA, contains our PA!
- Table holds in VA to address table by!!!
- (Diagram of CPU, VA, MMU, and RAM)

**MMU:** Translates VA to PA and this must be FAST and SMALL.
- ---

### **Multi-Level Page Table (MLPT)**

- **Algorithm for Translating VA to PA**:
  1.
- Use the VA to find the **root node** of the MLPT.
- Traverse through levels to locate the **frame** or **leaf** where the PA resides.
- Compute the offset from the frame to complete the translation.
- - The MMU translates the VA to a PA.
  - If valid: Access memory.
- - Root size is proportional to the VAS; large VAS means large roots.
- **Frame Offset**:
   - Page frame gives the starting PA.
   - Offset calculation determines the exact location within the frame.
- **Scaling Issues**:
   - Assumptions for VA = PA = 32-bit:
     - Requires efficient translation to handle the scale of \( 2^{32} \).

## scheduling
- We cannot take resources from processes that hold them without killing them.
- The resource we are waiting for must be mutually exclusive, and it cannot be preempted to be taken away.
- Resources, if numbered, can only be asked for in ascending order.
- - resources are non preempt-able.
- - Resources cannot be forcibly taken away.
- - Preemption is an ingrained property of the resource.
- - If you cant get all of your resources, release all of the resources that you hold.
- - You either get all as one group 
		- or release them all and try again later to get them as one group

- Deny the ability to go to a number resource lower then the resource you are currently on.
- - You cant request some resource numbered lower then the number of the highest resource that you currently hold.
- The solution is to add more resources.

## tables
- Assuming we only load main() and main calls f(), we can plop f() over main in RAM while it’s running.
- **Swapping:**

- Swapping is where we just move things (processes) in and out of RAM as necessary to fit everything.
- (Diagram of swapping structure)

- This takes a process out of the ready queue but keeps it out of RAM.
- - What if a program moves in RAM?
- - What if a program were to move in RAM?
- Our base is always going to be address 0x0 in this approach
```

### Swapping

A way of creating an illusion of more memory is **swapping.
- Swapping** is the idea
of “pausingˮ a process by putting it away in memory to let some other processes
run instead.
- - Replacement depends on whether data is modified (dirty bit).

## translation
- ### Page 1

**Title:** We need something that maps Virtual Address → Physical Address

**Mapping:**

- Lots of virtual addresses, less physical addresses (PA)
- Hash!!
- VA → hash → PA; collisions more than one VA → **Pigeonhole!
- **
- Hash sucks because we can collide before we need to, same address made but no spot is free.
- Hash is prescriptive, tells things what to do.
- - Hashing could work, but collisions are undesirable unless absolutely necessary.
- - Potential solution: Multiple address spaces or segmentation.

## vas
- Linked list, stop or start a new program
Process says they are done by making an exit syscall.
- Removes itself from queue data structure
EXEC syscall ➔ Replaces a syscall with another syscall.
- FORK syscall ➔ says I am creating a new process.
- Switch context to the job that I said
Change the program counter to the instruction of the process that I chose.
- **Why is your process waiting for a resource?
- **

- Another process might have it.
- - Running a program from the start again, it may not perform the same way again.
- Sharing problems:

- Protection problem: What if a process can see outside its range?
- #### Protection Problem
- Make sure that process does not read or write memory that belongs to another.
- - Between executions.
- - During execution.
- - Leaves are omitted when unnecessary.


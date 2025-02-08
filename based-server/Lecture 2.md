### As a programmer we program with OS abstractions. We think that we have:
- Exclusive access the the CPU's time
- Huge amounts of dedicated RAM to hold its code and data
- Exclusive access to I/O devices
- Transparent security.

- Programmers have this idea that we have ==exclusive access==.
	- Abstraction hides details, it lets the programmer think they have all the resources. ==Virtualization== enables this.

- ==Real-time== systems (embedded devices): Can only run one program at a time.

- In a von Neumann architecture if we want to run three programs at the same time, they must all be in memory at the same time.
	- One way is partitioning
		- Divide the region up into pieces.
		- Give a piece to each program.
	- Naive approach, slice up the memory and give each a space.
		- These issue do not exist on a system which only runs a single program.

- The operating system needs its own memory space because it is a software program.

- A 32 bit address space spans about 4gb.

- Virtualization provides the illusion of exclusive access.
	- The OS will virtualize most of the resources in the system.
	
- We want the operating system to have authority over the resources.
- User space will need to access the system resources as well, this is done through system calls

### Questions 
- #question What is the difference between GNU and Linux.
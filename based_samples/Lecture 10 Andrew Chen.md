# Lecture 10 - Threads & Processes Overview

- Similar to processes expect the address spaces for threads are all shared 
	- Every thread can modify the address space of another thread
- Processes have isolated address spaces, slower for one to access another as it requires a system call.  
- Two threads can communicate with each other with stores and loads
	- Operating System is not involved; Thus, much faster
## Thread
- A thread is a stream of instructions and its associated state  
- But a process is also instructions with state, so what's the difference  
- Every process has a thread, but some processes could have more than one

## Parallelism
- When should we choose threads vs processes? Parallelism will help us decide
- If we have a web sharing wishing to share resources among many users, then threads would be ideal
- If we wish to isolate different tasks - credit card vs spotify - processes would be ideal
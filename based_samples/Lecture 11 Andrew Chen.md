# Lecture 11 - Threads (P2) 
## Overview

- If the user wants to manage or create a thread, then we will use the pthread library to choose a kernel thread or a user thread
- User threads are faster than kernel threads - no context switches from user space to kernel space 
- All kernel threads are scheduled by the scheduler in the operating system  
- Threads are sharing an address space; Thus, they must work competitively
	- But the threads seems to be competitive for the cpu time
	- So we need a function call to leave a current thread - Yield  
- Everything true about the transitions and states for processes is true for threads Using scanf is bad as the read() system call blocks the entire process
	- Need some way to wait for the data from OS but not block the process
	- A system call that doesn't block but tells us if read will block or not Read only blocks if the data is not immediately available
	- select() system call tells us if read will block
	- If read will block, go to the scheduler and run another thread
	- When a thread exits, yields, or block, we enter the library and we go back to select() 
- We wish to have the speed of user-thread, but the simplicity of kernel threads
	- **can have the programmer choose  ** BAD
	- can divide a kernel thread's time among user threads  
	- only the kernel thread is necessary  
	- no help is needed for user threads, responsibility lies within the programmer
# Lecture 8 - Process Life Cycle & Interrupts

## Overview
- Need to be mindful of which instruction types we use for project 2 - syscalls
	- Differences between x86 and ARM64 instruction sets
	- ARM64 OS is not completely mapped into user space
- Every time we copy to and from user-space, make sure to use the system-independent instructions
	- Instructions could cause the Kernel to crash & lose data
- Last time, we discussed multiprogramming, which allows a CPU to execute multiple processes using context switches to make it appear to the user that multiple programs were being ran concurrently
- Not true parallelism as there are more processes than processors
	- As stated by the Pigeonhole Principle, if the number of processes > processors, at least 2 processes are being run on the same processor
- Thus, context switching is very necessary to create the illusion of multiprogramming 
- CPU can perform better if it juggles processes more efficiently
	- Processes that need to wait for a return will be temporarily left by the CPU
	- The CPU will schedule another process to run for a certain amount of time 
	- When the first process is ready again, it'll send a system call to the CPU 
	- The CPU will eventually reschedule the process and run it again
- Scheduling refers to the CPU picking amongst the set of ready processes to run

## Process Life Cycle
- A process forks itself, creating a new process
- This new process is loaded into memory and is ready to be ran
- The CPU schedules the new process to be ran
- The CPU runs it for a bit, switches, then runs it again
- The process may be blocking itself
- Eventually, the new process finishes execution
- The process called exit, a system call to the CPU that comes from the software
    - The CPU frees up all memory used by the process
    - The scheduler removes the process from the linked list of processes to run

## Exception
- By using exceptions in Java and other languages, we can separate the handling of error's by different components of the computer
- The program will handle an error by redirecting it to the OS which uses the interrupt vector to then call it's specified handler, then returns the result back to the program.
## Processes Scheduling & Hardware Interrupts
- When exit() is invoked by a process, that process is finished
	- So, the exit() syscall returns to the next scheduled process to be ran
- In a batch system, programs are ran to completion
	- No multiprogramming is involved
- But the CPU can run a process while another one is running
	- If process A invokes an I/O syscall, then the CPU can run another process until process A finishes running
- The next instructions of a program are not going to run until it finishes I/O
	- scanf is considered a blocking function, halts the program execution until input is available
- While a process is being blocked, it would be ideal to fill in that time by having the CPU schedule run another process.
- There needs to be a reason and way for a blocked process to unblock itself
	- The data is now available and the OS can know this by polling or the process could make a syscall
- What if we have a one line infinite while loop? It is doing work, thus never makes any system calls.
	- How do we switch to the OS and then schedule another process?
	- Use hardware interrupts? Why not software? It is preoccupied with the infinite loop.
- All components in the computer are connected via a bus for communication
	- All messages have an address associated with it and every device can listen
	- Hardware components will respond to messages that have their associated address.
	- The component will then send its own message to the CPU
		- The message is a hardware interrupt from a hardware device to the processor over the bus
		- The processor will stop itself and then start the OS, starts the interrupt handler in it
		- The OS unblocks the program that was blocked
		- The scheduler is then ran and then it determines which ready process should be ran next
- Thus, now we have a system that juggle multiple processes and then determines what should run next
- A process can be blocked, unblocked, ready, running, or done
- We need to ensure that a program eventually leaves the running state and goes back to ready so that other programs can be scheduled and ran
	- Can use a hardware timer to give a specified amount to each program
	- Will need to keep track of how many cycles the program has been running
	- But the only program running is the infinite loop, not the OS
	- Thus, there must be a hardware interrupt that kicks the running process back to ready
		- Must be done without the OS's help
	- Two ways to achieve this:
		- Cooperative: Have every program periodically make a system call (Yield)  
		    - Called cooperative systems, must play nice with each other
		- Competitive: A hardware timer that makes an interrupt when the time is reached
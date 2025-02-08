# Lecture 8 - Process Life Cycle & Interrupts

- #project make allocation in kernel space and copy parameter to kernel space.

- A ready process is a process that has everything that it needs to run right now except the CPU's time
	- The only reason why we aren't running right now is that the CPU is doing something else.
	
- Why does an exit system call cause our processes to exit
	- Because the syscall removes the process from the list of ready programs
	- Whatever is the current running list of programs needs to be interrupted for the
- Software interrupt ➔ the interruption comes from software
- Hardware interrupt ➔ exception is a type of hardware interrupt. Division by zero, bad memory address, illegal instruction. They are hardware interrupts because, rather then running an instruction, a piece of hardware noticed something wrong, so that the operating system begins to run.
	- Syscall (I WANT THE OS TO START RUNNING)
	- Exception handling as a way to deal with errors.
	
- So you're saying that when open returns, you need to parse that data yourself **(BAD should get thrown out for being too different)**

- Exception allows for loose coupling, two things do not need to be related
	- In object oriented programming
	- You dont expect the CPU to give you an answer you expect it to TELL you that something went wrong.
	- Where i notice the problem is not the same place that I want to handle it.
### Implementation of exit
- Remove the process from list of ready processes, so that we don't schedule it again.
	- We could just mark the state as exit and keep it in the linked list.
- When exit is called, the OS goes back to the exit that was called and runs the next process. 
	- EXIT ➔ goes into kernel mode ➔ context switch ➔ pick next process ➔ go back to exit, run next process.
- We need to have a reason to have a process ready, but not running.
	- Some processes block, especially I/O bound processes.
- While program has work blocked, it would be great to be able to do work from another process.
- read() asks the operating system to get something from ram. read() says hey hard drive, go get this data and put it in ram. Until the data gets into RAM the processes needs to be blocking. 
- Blocked ➔ process is around an waiting but please don't schedule it right now.
- Mark the current processes as blocked and go run the scheduler.
- We need some way to unblock a process.
- On the exit system call, check if a blocked processes. 
- CPU RAM and IO are connected on a shared channel called "the bus"
- On the bus everybody is listening and everybody can talk.
- Devices know which messages are meant for them.
- Messages sent to the cpu over the BUS are hardware interrupts, when the software sees this message it stops what its doing.
- Two processes have their state change because of the hardware interrupt.
- A way to ensure that a process that enters the running state will eventually leave.
- If we want the OS to notice that we have run too long, we cant get the CPU away from the running program cause the CPU is not asking for that. The CPU has to send a hardware interrupt.

- Running to ready ➔
	- Running programs periodically make a system call so they are no greedy and monopolize the system call
		- Yield. (you're being nice)
		- Cooperative systems
- If you have to cooperative are you sure that the OS is "Unpassible ?"
- Competitive systems: Has a piece of hardware who's sole purpose is to generate an interrupt after a certain amount of time.
### Questions
- What exactly is the pigeonhole principal?
- When you have a blocked process and you receive a hardware interrupt, how do you know that the hardware interrupt is associated with a particular blocked process.
	- Probably its the code that handles the interrupt along with some data included in the hardware interrupt.
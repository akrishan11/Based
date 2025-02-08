- In linux that max stack size is about 8 megabytes.

- One process with 3 threads in it, the amount of stuff that we need to track per process is now different. (BAD)

- What we store per thread is less that what we store per process.
- context switching implies switching from one thread to another.

- Parallelism expressed through processes is slower then processes expressed by threads
	- We want the separation between process space to be separating processes that are unrelated.
	- If we apply the thread model to the entire OS, we basically have just the process model.

- There are mulit-threaded web servers and multiprocess webservers.
- HTTP is a stateless protocol. When you ask for the HTML file, it doesn't remember you when you later ask for an image.
	- Because they are stateless, I can do all of the requests at the same time.
	
- Address space is a limited resource.
### Caching.
- When you have an external caching server. How does that integrate with a multithreaded system. What are the benefits of this. 
	- Probably less benefits then having the caching on the same place as your web server. Also depends on what you're caching.
- Message : Events that turn into signals.

- If 1 thread has a mistake in it, the whole process dies.
	- If the address space goes away, everything is gone.
	
- Linux allows you to make signal handlers on a per process basis.
	- Processes are used to group resources together, threads are the entities scheduled for execution on the CPU.

- User threading requires a library.
	- Pthread library is meant to be a level above the implementation in the operating system.
	- In theory, thread switching is not as bad as Kernel space.
	- In user threading, the os is only scheduling processes.
	
- Context switch saves state and restores it.

- Threads are not the same as processes, threads are cooperative. it is reasonable to demand that they yield.

- Upcall is the opposite of the event driven model.

- All of the work in the process is related to the same thing.

- Does the system get hurt bc 2 of your 3 threads doesn't run.

- A properly threaded application needs to call pthread yield a bunch.

- Clock could have its own timer - Threading is cooperative. 
## User threads
- we are supposed to assume the OS knows nothing.

## Kernel threads
- Pthread yield would run slower in a kernel theaded operating system.
	- NoOp

### #Questions
- Benefits and drawbacks of multi-threaded vs multiprocess webservers?
	- If there is a mistake what level of damage can I do?
	- Separate processes allow us to reduce the impact of a vulnerability. 
	- Increased performance of the threads argument.
	- Should be faster to switch between threads vs processes.
- What is a worker on a webserver
- Competitive vs collaborative system.
- Could you imagine some sharing that would allow us to have a threaded server.
 - How does the OS send a signal, exceptions.
 - In user space threads each thread is like a function jump and link???
 - I kind of dont understand thread execution?
	 - Look at some examples of where threads are important.
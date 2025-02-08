# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State
# Lecture 9 - Process Life Cycle (P2)

## Overview

- Sometimes, there are processes that do not ever block or tell the CPU to switch.
- This could cause a process to hog all of the CPU's resources.
	- A program does not exit, does not halt, or I/O is available from another program.
	- But a program does not need to do all of these... software interrupts are not guaranteed.
	- Thus, we need a hardware interrupt that interrupts frequently enough to not break the illusion of pseudo-parallelism.
- To solve this problem, we could have every program periodically issue a syscall to the CPU. This will solve the issue of a process potentially using all resources.
OR 
- To solve this problem, we could have every program periodically issue a syscall to the CPU. 
	-  This will solve the issue of a process potentially using all resources.
### Cooperative & Competitive
- Cooperative OS trusts that every process must cooperate with each other on the system for it to behave properly.
	- Feels like the OS isn't really doing what it should be doing—managing the resources.
	- So why do we need an OS in the first place if the programs can behave?
	- From a modern OS perspective, we do not want to have programs yielding (behaving) for the system to work properly.
		- But yield is still a used concept with processes - `pthread_yield`.
		- A thread will yield to other processes.
	- The OS does not care about one program individually—acting as a dispassionate authority figure. 
		- It just balances the needs of the ready, stopped, and running processes.
	- Yield may be used for individual programs but not usually system-wide.
	- If we cannot trust individual processes to make these system calls, then how can we do it?

A hardware timer interrupt is issued by the CPU after a certain amount of CPU clock cycles.
- The hardware timer component is known as **preemption**.
- Referred to as a **timer interrupt**, which loads the CPU and then runs the scheduler.
- The scheduler can pick from among all the ready processes, including the one that was interrupted.

There is a shift in the way we view programs:
- Need to write cooperative code if we want programs to behave nicely with each other.
- But we write programs that greedily consume system resources without care for the other ones—thus, the OS takes on the burden to manage.
OR
There is a shift in the way we view programs - need write cooperative code if we want programs to behave nicely with each other

### Process Table Entries
- Since a process can be in one of multiple states: **ready, running, stopping, exited**.
- OS stores processes in something called a **Process Table**.

- What is the OS keeping in this table?
	- Each entry in the process table stores a lot of metadata about the process it represents:
		- Registers
		- Program counter
		- CPU status word
		- Stack pointer
		- Process state
		- Process ID
		- Etc.

- Metadata refers to data that describes data about the processes.
- The OS can send signals to different processes to tell them what to do. In addition, there are many resources that the process may be accessing, which is also stored as metadata:
	- File Management
	- Root Management
	- Working Directory
	- File Descriptors
	- User ID or Group ID
	- Memory Management - Pointers to text, data, stack, or Pointer to page table
	OR
	- Memory Management 
		- Pointers to text, data, stack, or Pointer to page table

### Thread
- A **thread** is a stream of instructions and its associated state.
- But a **process** is also instructions with state, so what's the difference?
- Every **process has a thread**, but some processes could have more than one.

### Multiple Processes vs Single Process with Multiple Threads
- Assume that processes are mostly independent—do one task after another.
- Without threads, each process represents a task.
- Circles represent a wall around each process, representing isolation.
- **Each squiggly line represents a program thread**. BAD
- For multiple processes, the OS is ultimately in charge of it.
	 - *Shared Memory, threading, `read`, `open`, `write`* THIS IS BAD
	- Whenever a process wishes to access memory that does not belong to it, it involves the OS.
- For a **process with multiple threads**, accessing memory does **not** involve the OS.
- All **threads share the same segments of memory**, so just use **store/load instructions**.
- Every process has at least **one thread**, and each thread has a **thread state**.
* Process State:
	- Address Space
	- Open files
	- Child Processes
	- Signals & Handlers
	- Accounting Info
	- Global Variables
OR 
* Process State:
	- Address Space, Open files, Child Processes, Signals & Handlers, Accounting Info, Global Variables
	
* Thread State:
	- Program Counter
	- Registers
	- Stack & stack pointers
	- State
OR
* Thread State:
	- Program Counter, Registers, Stack & stack pointers, State

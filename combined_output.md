### Questions 
- #question What is the difference between GNU and Linux.

## Overview
- An operating system is allowed to say "no" to a request from a user.
        - A variety of reasons that resource cannot be allocated
                - Used by another program
                - Not enough memory in RAM
        - The OS can abstract away the details of implementation from the user.
                - A floppy disk for example.
                - A floppy disk needed to be configured by the user
                        - Wait for the disk
                        - Someone needs to issue an order to start the motor, spinning the disk.
                        - Close the floppy disk
                - What if the user forgets to shut off the motor?
                        - Computer would melt likely burn because of this
                        - Need to be sure that those using the system aren't able to break them irrevocably.
                        - Solution: The OS should be left with the responsibility that users might not do properly.
                - How can the programmer know what functionality is left to the OS?
                - Only focus on the higher levels of programming; lower level is left to the experts.

## Issues with Sharing
- If we allow memory to be shared in partitioning.
        - Different processes can read/write to different chunks of memory.
        - These chunks of memory may belong to different processes.
        - Interfere with other processes.
        - Want to alter only the program that should be altered.
        - Protection Problem.
        - Must be careful about assuming when a program lives.
        - In theory, we should be able to run at any part of RAM memory.
        - Referred to as the "Relocation Problem".
        - A program may be able to run at any portion in RAM memory.
- Did we worry about this prior? No, because we didn't use a memory management system as simple as this one.
- But this is not what we are used to.
        - It appeared that we had all of the memory to the program.
        - The process lived in an address space.
                - A mathematical idea referring to the enumeration of all possible elements of whatever we are talking about.
        - Modern computing systems are byte addressable, can only access 8 bits at a time.
- For example, a 32 bit address space spans 4 GB.
        - If we were to compute and deference all possible 32 bit addresses:
                - We may get a byte from the Stack, Heap, Code, ... etc.
                - But the program may also segfault and terminate.
        - Some of this space is for the program or it is not the program's yet.
                - We can't allocate space for the heap or the stack.
- Massive problem, this means that the amount of memory other processes can get is decreased.
        - Thus we need to ensure that the OS is telling the program.
        - But we can get away with the lie as long as everyone doesn't ask too many questions.
- This is referred to as an abstraction.
        - The OS presents the "exclusive access" perspective to each program.
        - Each program believes that it has all of the RAM.
        - The OS is the "adult" in the room.
        - If the OS cannot say "no", then it doesn't have any true authority.
        - All programs must request a resource of the OS.
                - System call.
                - Write integers to memory, read input, play sound on speaker, exit the program, etc.
        - Requires resources needed for a program.
        - Can only work if there is an agreement between a running application and the resources it wishes to use.
        - Example: The OS is pretending to be a computer that does not exist.


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

## Abstraction
- Not only makes programmers lives easier, but also automates tedious processes
        - Originally programmers were writing code that would damage or break the system.
- OS handles the sharing of processor power between programs; programmers will never consider this.
        - Allocating an object, running a program, etc.
        - OS lies between applications and hardware; applications have exclusive access to processor and memory.
        - No other processes will be on the computer.
        - Embedded processors only run one process on the OS.
        - In this course, thinking about the sort of management that makes sense.
        - No one program can use all of it.
        - OS may need to say no to a request to a program when it cannot sufficiently perform the operation.
        - Need to manage shared resources, not just of one program.


## Virtual Memory
- If we want to run multiple programs simultaneously, we will need to use virtual memory.
        - One way is partitioning.
                - Divide the region into pieces.
                - Give a piece to each program.
        - Von Neumann needs programs code & data to all be in memory in order to run them.
        - All programs we want to run MUST be in RAM (Memory).
        - In order to perform loads and stores.
- Why do we need to the OS to be in RAM (memory) alongside the other programs?
        - It itself is a program, thus it needs to be in RAM memory.
- How do we manage this memory?
        - Can give a piece of the cake to each process we wish to run as the operating system.
        - Called partitioning, we share the memory with all processes.

# Lecture 2 - Virtualization & Abstraction



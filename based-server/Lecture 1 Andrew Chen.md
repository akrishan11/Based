# Lecture 1 - Introduction
## What is an Operating System?
- A piece of **software** that:
    - Manages resources
    - Abstracts details

## Resource Management
- A resource is anything of value and **finite**
- Examples include:
    - The CPU's time
    - The main memory (RAM)
    - Input/Output (I/O) Devices
        - Disks
        - Other hardware peripherals (outside of the CPU)
    - Security of the system
- Work takes time - computers are no different in that regard
- Need to consider how these resources are to be managed
- What sort of computer? What defines the system?
    - Need to define a metric to use
- Form a loose outline of the rest of the course:
    1. CPU Time
    2. RAM - Where programs are contained (Stack, Heap, Variables)
    3. I/O
    4. Security
## Architecture
- **Von Neumann:** A particular architecture called the "stored program" architecture
    - Can organize and build electronic circuits needed - Control flow
    - Taking things and seeing how they could be represented as a series of bits in memory
    - All of the numbers live in the same memory - Variables and Program Code
    - Fetched and retrieved from the very same RAM
- Numbered the data, the code, everything
- Ambiguity with what the things say - could be anything
    - Primitive data types, Array, Instructions, etc.
- Allows us to use the same number to represent many different things
- To solve this ambiguity, we needed context
    - If we fetch, then the number is an instruction
    - Processor is reading a number and interpreting it as an instruction
    - In MIPS, we had a PC (Program Number) register to determine which instruction we were on
- **Harvard:** Two RAMs: Data and Code
- In Von Neumann, we can modify the program while it is running
    - Can treat data as code and code as data
    - Impossible to do in Harvard simply because Data cannot be treated as Code and vice versa
    - Very much frowned upon by the community
- In Von Neumann, we cannot modify anything **not** in RAM (memory)
    - Need to load a program/file first to RAM, modify it, and save it to disk
## Security
- Considered to be a management task within the OS
- Resources can be answered with a simple Yes/No or wait
    - OS grants programs resources based on their priority
## Abstraction
- We get the illusion of hiding details from each running program
    - Access to the CPU's time
    - Huge amounts of dedicated RAM to hold its code and data
    - Exclusive access to I/O devices
    - Transparent security
- We are worried about sharing the resources of the system
- "Exclusive access", we are using a technique called **virtualization**
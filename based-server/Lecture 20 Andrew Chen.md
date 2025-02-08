# 11 / 11 - Lecture 20

## Memory Management

We manage RAM because it is a **limited, volatile** resource
As we run more and more processes at the same time, we must share more and
more RAM

### Naive Solution

Give all of RAM to any process that is running
This “solutionˮ kills concurrency

### Fixed Partitions

Divide RAM into chunks of fixed size and then allocate them to processes that
want to run
Partition size cannot change while the system is on
This solution reintroduces protection and relocation problems back into our code
Protection  A process can look into the memory of another process. This is
unsafe and could be abused by malicious attackers

```
Relocation  The memory a process is allocated gets changed over time. The
relocation problem is the issue of a program not expecting this move and using
a memory address that mightʼve belonged to it in the past, but does not
anymore
How do we solve these problems:
For protection, we set up bounds for every memory region. If a process
wants to use memory outside of its bounds, we deny it
```

```
In this approach, every instruction that a program runs, a context switch
occurs just to check if the program is in bounds. Some instructions context
switch more than once because they have default context switches already
associated with them (for example, sw and lw).
This is unusable due to poor performance
To make this approach actually usable, weʼd have to add two registers to
our physical CPU architecture since that would be the only way we have
a fast enough way to check memory bounds.
To solve the relocation problem, we must use relative memory addresses
over absolute ones.
Our base is always going to be address 0x0 in this approach
```

### Swapping

A way of creating an illusion of more memory is **swapping. Swapping** is the idea
of “pausingˮ a process by putting it away in memory to let some other processes
run instead.
This approach has a multitude of problems:
Protection and Relocation have been reintroduced
A program can be brought back from memory and might try to access a
memory address that is no longer valid for it
Dynamic allocation becomes more difficult because we donʼt know the exact
amount of memory a process will need
How do we keep track of what memory is free and what is in use?

## Free Space Tracking

Bitmap
Free vs in-use are 2 mutually exclusive options
Store 1 bit per “chunkˮ

```
Process A gets paused in step 4
```

Where is this data structure stored?
In the same place as the memory it is managing
Somewhere in RAM or Disk based on what space we are tracking
If we assume that the smallest addressable unit is a byte and we want to
track free memory at the smallest unit:
1 bit needed for every byte. In other words, for every 9 bits, there is 1
usage bit
11% of our RAM is going to go towards just storing the bitmap
This is inefficient
Letʼ s increase the number of bytes covered by the bitmap. Now, one bit
represent 1 Megabyte:
1 bit needed for every megabyte
This approach gives us an overallocation problem where someone only
requests a small amount of memory but is given a whole megabyte
chunk
The wasted space that is not used because it is not needed is called
**Internal Fragmentation**

```
Large chunk sizes cause wasted space
Small chunk sizes mean our bitmap is going to take up more space
Since we have issues with both large and small chunk sizes, we must
experiment with both options to find what works best in practice
```

The average chunk size in practice is 4 kilobytes

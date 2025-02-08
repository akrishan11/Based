### **Mapping Virtual to Physical Addresses**

- **Mapping Overview**:
  - Lots of Virtual Addresses (VAs), fewer Physical Addresses (PAs).
  - Need a mechanism (hashing or similar) to map VAs to PAs.
  - Collisions (e.g., pigeonhole principle) are inevitable.
    - Hashing could work, but collisions are undesirable unless absolutely necessary.
    - We want prescriptive mapping, not random or overly dependent on free space.
  - **Goal**: Translate at least one VA per instruction with minimal performance overhead.
  
- **Constraints**:
  - **Small and Fast**: Mapping must be fast and efficient to avoid becoming a bottleneck.
  - Should reside on-chip because off-chip solutions would slow down access speeds.

---

### **Example: 32-bit System**
- VA = 32 bits → \( 2^{32} = 4 \text{GB} \)
- PA = 32 bits → \( 2^{32} = 4 \text{GB} \)
- Issue: What if we need more than 4GB of RAM?
  - Potential solution: Multiple address spaces or segmentation.
- Calculations:
  - 1GB of RAM requires \( 2^{30} \) addressable units.
  - This is a challenge for a 32-bit architecture if we surpass 4GB.

---

### **Multi-Level Page Table (MLPT)**

- **Algorithm for Translating VA to PA**:
  1. Use the VA to find the **root node** of the MLPT.
  2. Traverse through levels to locate the **frame** or **leaf** where the PA resides.
  3. Compute the offset from the frame to complete the translation.

- **Assumptions**:
  - 2-Level Translation.
  - Time complexity = \( O(2) \) for this example.

---

### **Subsetting (Page Replacement)**

- **Boot-Up Process**:
  - Scheduler assigns the program's first PC (Program Counter) to the Memory Management Unit (MMU).
  - The MMU translates the VA to a PA.
  - If valid: Access memory.
  - If invalid: Trigger a page fault and invoke the OS for page replacement.
    - OS needs to check whether to load the page into RAM or replace an existing page.
    - Replacement depends on whether data is modified (dirty bit).

---

### **Virtual Address Space (VAS)**

- **Exploiting Sparsity**:
  - Linked lists (or similar structures) can be used for sparse VAS mappings.
  - Issues:
    - Linked lists introduce \( O(n) \) traversal overhead.
    - Better alternatives: Balanced trees (\( O(\log n) \)).
    - Multi-Level Page Tables (MLPT) are a more practical solution.

---

### **Multi-Level Page Table Explanation**
- Example: \( 4 \text{GB} \) Virtual Address Space.
  - Each leaf maps to 4KB of RAM.
  - Leaves are omitted when unnecessary.
  - Root size is proportional to the VAS; large VAS means large roots.
  - Efficient for sparse mappings by avoiding leaves when possible.

---

### **Challenges in VA to PA Translation**

1. **Frame Offset**:
   - Page frame gives the starting PA.
   - Offset calculation determines the exact location within the frame.

2. **Sparse Mapping**:
   - Many VAs may not correspond to active PAs.
   - Valid bit optimization:
     - Only store valid mappings in RAM.
     - Saves space and avoids fragmentation.

3. **Scaling Issues**:
   - Assumptions for VA = PA = 32-bit:
     - Requires efficient translation to handle the scale of \( 2^{32} \).

4. **Frame Size**:
   - Larger frames reduce page table size but increase fragmentation risk.
   - Need to balance between frame size and page table efficiency.

---

### **Key Notes**
- **Huge Translation Problem**:
  - \( 2^{32} \text{VAs} \) to \( 2^{32} \text{PAs} \): Infeasible to manage directly.
  - Sparse mappings mitigate this by storing only necessary translations.

- **Page Table Design**:
  - Goal: Minimize RAM usage while maintaining fast access.
  - Frame size affects table size and must align with system constraints.


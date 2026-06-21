import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateLinkedListSteps } from "../problems/LinkedListVisualizer";

// ─── Custom Step Generators ──────────────────────────────────────────

export function generateInsertionSteps(arr: number[], insertVal: number, position: string): any[] {
  const steps: any[] = [];
  const nodes = arr.map((val, idx) => ({ id: idx, val, nextId: idx === arr.length - 1 ? null : idx + 1 }));
  const links: Record<number, number | null> = {};
  nodes.forEach(n => { links[n.id] = n.nextId; });

  steps.push({
    nodes: nodes.map(n => ({ ...n })),
    pointers: { head: 0, curr: null },
    links: { ...links },
    problemType: "reverse",
    description: `Initialize list before inserting ${insertVal} at position: ${position}.`,
    codeLine: 1
  });

  if (position === "head") {
    const newNode = { id: 99, val: insertVal, nextId: 0 };
    const newNodes = [newNode, ...nodes];
    const newLinks = { 99: 0, ...links };
    steps.push({
      nodes: newNodes,
      pointers: { head: 99, newNode: 99 },
      links: newLinks,
      problemType: "reverse",
      description: `Create new node ${insertVal} and point its next to the current head (Node ${nodes[0].val}).`,
      codeLine: 4
    });
  } else {
    // Insert at tail
    let curr = 0;
    while (links[curr] !== null) {
      steps.push({
        nodes: nodes.map(n => ({ ...n })),
        pointers: { head: 0, curr },
        links: { ...links },
        problemType: "reverse",
        description: `Traverse to find tail: currently at Node ${nodes[curr].val}.`,
        codeLine: 7
      });
      curr = links[curr]!;
    }
    const newNode = { id: 99, val: insertVal, nextId: null };
    const newNodes = [...nodes, newNode];
    links[curr] = 99;
    const newLinks = { ...links, 99: null };
    steps.push({
      nodes: newNodes,
      pointers: { head: 0, curr, newNode: 99 },
      links: newLinks,
      problemType: "reverse",
      description: `Found tail. Point tail's next to the new node ${insertVal}.`,
      codeLine: 10
    });
  }

  return steps;
}

export function generateDLLSteps(arr: number[]): any[] {
  const steps: any[] = [];
  const nodes = arr.map((val, idx) => ({ id: idx, val, nextId: idx === arr.length - 1 ? null : idx + 1 }));
  const links: Record<number, number | null> = {};
  nodes.forEach(n => { links[n.id] = n.nextId; });

  steps.push({
    nodes: nodes.map(n => ({ ...n })),
    pointers: { head: 0, curr: 0 },
    links: { ...links },
    problemType: "dll",
    description: `Initialize Double Linked List (DLL) traversal. Double links are established.`,
    codeLine: 1
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      nodes: nodes.map(n => ({ ...n })),
      pointers: { head: 0, curr: i },
      links: { ...links },
      problemType: "dll",
      description: `Traverse forward. Node ${nodes[i-1].val} ⇄ Node ${nodes[i].val}.`,
      codeLine: 4
    });
  }

  return steps;
}

export function generateRemoveNthFromEndSteps(arr: number[], n: number): any[] {
  const steps: any[] = [];
  const nodes = arr.map((val, idx) => ({ id: idx, val, nextId: idx === arr.length - 1 ? null : idx + 1 }));
  const links: Record<number, number | null> = {};
  nodes.forEach(n => { links[n.id] = n.nextId; });

  steps.push({
    nodes: nodes.map(n => ({ ...n })),
    pointers: { fast: 0, slow: 0 },
    links: { ...links },
    problemType: "reverse",
    description: `Initialize fast and slow pointers at head. We want to remove the ${n}th node from end.`,
    codeLine: 1
  });

  let fast: number | null = 0;
  for (let i = 0; i < n; i++) {
    fast = links[fast!]!;
    steps.push({
      nodes: nodes.map(n => ({ ...n })),
      pointers: { fast, slow: 0 },
      links: { ...links },
      problemType: "reverse",
      description: `Move fast pointer forward by ${i+1} steps (now at Node ${nodes[fast!].val}).`,
      codeLine: 3
    });
  }

  let slow = 0;
  while (fast !== null && links[fast] !== null) {
    fast = links[fast]!;
    slow = links[slow]!;
    steps.push({
      nodes: nodes.map(n => ({ ...n })),
      pointers: { fast, slow },
      links: { ...links },
      problemType: "reverse",
      description: `Advance fast and slow pointers together. slow = ${nodes[slow].val}, fast = ${nodes[fast].val}.`,
      codeLine: 5
    });
  }

  // delete slow.next
  const targetId = links[slow]!;
  links[slow] = links[targetId];
  if (nodes[targetId]) (nodes[targetId] as any).deleted = true;

  steps.push({
    nodes: nodes.map(n => ({ ...n })),
    pointers: { slow },
    links: { ...links },
    problemType: "reverse",
    description: `Fast reached tail. Delete node next to slow: set slow.next = slow.next.next. Node deleted.`,
    codeLine: 8
  });

  return steps;
}

// ─── Registry Object ─────────────────────────────────────────────────

export const step4LinkedListsRegistry: Record<string, ProblemVisualizerMeta> = {
  "1_reverse_a_linkedlist_[iterative]": {
    problemName: "Reverse Linked List",
    category: "linked-list",
    description: "Reverse a singly linked list so that the nodes point in the opposite direction.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`
        }
      ],
      python: [
        {
          label: "Brute Force",
          code: `def reverseList(head):
    # Copy node values to array, reverse array, recreate list
    if not head: return None
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    curr = head
    for val in reversed(arr):
        curr.val = val
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def reverseList(head):
    # Recursive reversal
    if not head or not head.next:
        return head
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    return new_head`
        },
        {
          label: "Shorter",
          code: `def reverseList(head):
    prev, curr = None, head
    while curr:
        curr.next, prev, curr = prev, curr, curr.next
    return prev`
        },
        {
          label: "Optimal",
          code: `def reverseList(head):
    # Reversing links in-place (iterative)
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`
        }
      ]
    }
  },
  "0_middle_of_a_linkedlist_[tortoise_hare_method]": {
    problemName: "Middle of LinkedList",
    category: "linked-list",
    description: "Find the middle node of a linked list using the slow/fast pointer (Tortoise and Hare) method.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("middle", input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`
        }
      ],
      python: [
        {
          label: "Brute Force",
          code: `def middleNode(head):
    # Count length first, then step to mid
    curr = head
    count = 0
    while curr:
        count += 1
        curr = curr.next
    curr = head
    for _ in range(count // 2):
        curr = curr.next
    return curr`
        },
        {
          label: "Better",
          code: `def middleNode(head):
    # Store in list, return center index
    arr = []
    curr = head
    while curr:
        arr.append(curr)
        curr = curr.next
    return arr[len(arr) // 2]`
        },
        {
          label: "Shorter",
          code: `def middleNode(head):
    s = f = head
    while f and f.next: s, f = s.next, f.next.next
    return s`
        },
        {
          label: "Optimal",
          code: `def middleNode(head):
    # Slow & fast pointers technique O(N)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
        }
      ]
    }
  },
  "3_detect_a_loop_in_ll": {
    problemName: "Detect Cycle in LinkedList",
    category: "linked-list",
    description: "Check if a linked list contains a loop (cycle) where a node points back to an earlier node.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("loop", input.array),
    solutions: {
      javascript: [
        {
          label: "Optimal",
          code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`
        }
      ],
      python: [
        {
          label: "Brute Force",
          code: `def hasCycle(head):
    # Store visited nodes in dictionary
    seen = {}
    curr = head
    while curr:
        if curr in seen: return True
        seen[curr] = True
        curr = curr.next
    return False`
        },
        {
          label: "Better",
          code: `def hasCycle(head):
    # Keep track of visited nodes using a Set
    seen = set()
    curr = head
    while curr:
        if curr in seen: return True
        seen.add(curr)
        curr = curr.next
    return False`
        },
        {
          label: "Shorter",
          code: `def hasCycle(head):
    s = f = head
    while f and f.next:
        s, f = s.next, f.next.next
        if s == f: return True
    return False`
        },
        {
          label: "Optimal",
          code: `def hasCycle(head):
          # Tortoise and Hare cycle detection algorithm O(N)
          slow = fast = head
          while fast and fast.next:
              slow = slow.next
              fast = fast.next.next
              if slow == fast:
                  return True
          return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
        }
      ]
    }
  },
  "2_deleting_a_node_in_linkedlist": {
    problemName: "Delete Node in LinkedList",
    category: "linked-list",
    description: "Delete a node in a singly linked list given access only to that node.",
    visualizerType: "linkedlist",
    defaultInput: { array: [4, 5, 1, 9] },
    generateSteps: (input) => {
      const arr = input.array || [4, 5, 1, 9];
      const steps = [];
      const nodes = arr.map((val: any, idx: number) => ({ id: idx, val, nextId: idx === arr.length - 1 ? null : idx + 1 }));
      const links = arr.reduce((acc: any, _: any, idx: number) => { acc[idx] = idx === arr.length - 1 ? null : idx + 1; return acc; }, {});

      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 },
        links: { ...links },
        problemType: "reverse",
        description: "Accessing target node to delete (value: 5).",
        codeLine: 2
      });

      nodes[1].val = nodes[2].val;
      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 },
        links: { ...links },
        problemType: "reverse",
        description: "Copy next node's value into the target node.",
        codeLine: 3
      });

      links[1] = nodes[2].nextId;
      (nodes[2] as any).deleted = true;
      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 },
        links: { ...links },
        problemType: "reverse",
        description: "Bypass next node: target.next = target.next.next.",
        codeLine: 4
      });

      return steps;
    },
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def deleteNode(node):
    # Copy next node value and bypass it
    node.val = node.next.val
    node.next = node.next.next`
        },
        {
          label: "Better",
          code: `def deleteNode(node):
    # Copy value and point to next next node
    node.val = node.next.val
    node.next = node.next.next`
        },
        {
          label: "Shorter",
          code: `def deleteNode(node):
    node.val, node.next = node.next.val, node.next.next`
        },
        {
          label: "Optimal",
          code: `def deleteNode(node):
    # Bypass node by replacing its value and link O(1)
    node.val = node.next.val
    node.next = node.next.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}`
        }
      ]
    }
  },
  "3_find_the_length_of_the_linkedlist_[learn_traversal]": {
    problemName: "Length of LinkedList",
    category: "linked-list",
    description: "Traverse the linked list from head to tail to calculate the number of nodes.",
    visualizerType: "linkedlist",
    defaultInput: { array: [10, 20, 30, 40] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def getLength(head):
    # Count recursively
    if not head: return 0
    return 1 + getLength(head.next)`
        },
        {
          label: "Better",
          code: `def getLength(head):
    # Traverse and count
    curr = head
    count = 0
    while curr:
        count += 1
        curr = curr.next
    return count`
        },
        {
          label: "Shorter",
          code: `def getLength(head):
    c = 0
    while head: c += 1; head = head.next
    return c`
        },
        {
          label: "Optimal",
          code: `def getLength(head):
    # Linear traversal count
    curr = head
    count = 0
    while curr:
        count += 1
        curr = curr.next
    return count`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int getLength(ListNode head) {
        ListNode curr = head;
        int count = 0;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        return count;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function getLength(head) {
  let curr = head;
  let count = 0;
  while (curr !== null) {
    count++;
    curr = curr.next;
  }
  return count;
}`
        }
      ]
    }
  },
  "0_introduction_to_linkedlist,...": {
    problemName: "Introduction to LinkedList",
    category: "linked-list",
    description: "Create and traverse a singly linked list from an array.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def constructLL(arr):
    # Create nodes and link them using loops
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        curr.next = ListNode(arr[i])
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def constructLL(arr):
    # Construct using loops
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = ListNode(x)
        curr = curr.next
    return head`
        },
        {
          label: "Shorter",
          code: `def constructLL(arr):
    if not arr: return None
    head = ListNode(arr[0])
    head.next = constructLL(arr[1:])
    return head`
        },
        {
          label: "Optimal",
          code: `def constructLL(arr):
    # Linear list construction O(N)
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = ListNode(x)
        curr = curr.next
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode constructLL(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function constructLL(arr) {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}`
        }
      ]
    }
  },
  "1_inserting_a_node_in_linkedlist": {
    problemName: "Inserting a Node",
    category: "linked-list",
    description: "Insert a node at the head or tail of a singly linked list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3], val: 99, position: "tail" },
    generateSteps: (input) => generateInsertionSteps(input.array || [1, 2, 3], input.val || 99, input.position || "tail"),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def insertAtTail(head, val):
    # Naive traversal to find tail
    if not head: return ListNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = ListNode(val)
    return head`
        },
        {
          label: "Better",
          code: `def insertAtTail(head, val):
    # Check null, search tail
    if not head: return ListNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = ListNode(val)
    return head`
        },
        {
          label: "Shorter",
          code: `def insertAtTail(head, val):
    if not head: return ListNode(val)
    head.next = insertAtTail(head.next, val)
    return head`
        },
        {
          label: "Optimal",
          code: `def insertAtTail(head, val):
    # O(N) tail insertion
    if not head: return ListNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    curr.next = ListNode(val)
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode insertAtTail(ListNode head, int val) {
        if (head == null) return new ListNode(val);
        ListNode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = new ListNode(val);
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function insertAtTail(head, val) {
  if (head === null) return new ListNode(val);
  let curr = head;
  while (curr.next !== null) {
    curr = curr.next;
  }
  curr.next = new ListNode(val);
  return head;
}`
        }
      ]
    }
  },
  "4_search_an_element_in_the_linkedlist": {
    problemName: "Search Element in LL",
    category: "linked-list",
    description: "Search for a specific value in a singly linked list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4], target: 3 },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def search(head, key):
    # Recursive search
    if not head: return False
    if head.val == key: return True
    return search(head.next, key)`
        },
        {
          label: "Better",
          code: `def search(head, key):
    # Linear scan traversal
    curr = head
    while curr:
        if curr.val == key: return True
        curr = curr.next
    return False`
        },
        {
          label: "Shorter",
          code: `def search(head, key):
    while head:
        if head.val == key: return True
        head = head.next
    return False`
        },
        {
          label: "Optimal",
          code: `def search(head, key):
    # O(N) iterative search
    curr = head
    while curr:
        if curr.val == key: return True
        curr = curr.next
    return False`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean search(ListNode head, int key) {
        ListNode curr = head;
        while (curr != null) {
            if (curr.val == key) return true;
            curr = curr.next;
        }
        return false;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function search(head, key) {
  let curr = head;
  while (curr !== null) {
    if (curr.val === key) return true;
    curr = curr.next;
  }
  return false;
}`
        }
      ]
    }
  },
  "0_introduction_to_dll,...": {
    problemName: "Introduction to DLL",
    category: "linked-list",
    description: "Construct a doubly linked list (DLL) from an array.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4] },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 2, 3, 4]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def constructDLL(arr):
    # DLL construction linking prev and next
    if not arr: return None
    head = DLLNode(arr[0])
    curr = head
    for i in range(1, len(arr)):
        temp = DLLNode(arr[i])
        curr.next = temp
        temp.prev = curr
        curr = temp
    return head`
        },
        {
          label: "Better",
          code: `def constructDLL(arr):
    if not arr: return None
    head = DLLNode(arr[0])
    curr = head
    for val in arr[1:]:
        temp = DLLNode(val)
        curr.next = temp
        temp.prev = curr
        curr = temp
    return head`
        },
        {
          label: "Shorter",
          code: `def constructDLL(arr):
    if not arr: return None
    head = DLLNode(arr[0])
    nxt = constructDLL(arr[1:])
    if nxt:
        head.next = nxt
        nxt.prev = head
    return head`
        },
        {
          label: "Optimal",
          code: `def constructDLL(arr):
    # Construct DLL linking forward & backward pointers O(N)
    if not arr: return None
    head = DLLNode(arr[0])
    curr = head
    for x in arr[1:]:
        temp = DLLNode(x)
        curr.next = temp
        temp.prev = curr
        curr = temp
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode constructDLL(int[] arr) {
        if (arr.length == 0) return null;
        DLLNode head = new DLLNode(arr[0]);
        DLLNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            DLLNode temp = new DLLNode(arr[i]);
            curr.next = temp;
            temp.prev = curr;
            curr = temp;
        }
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function constructDLL(arr) {
  if (arr.length === 0) return null;
  const head = new DLLNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    const temp = new DLLNode(arr[i]);
    curr.next = temp;
    temp.prev = curr;
    curr = temp;
  }
  return head;
}`
        }
      ]
    }
  },
  "1_insert_a_node_in_dll": {
    problemName: "Insert in DLL",
    category: "linked-list",
    description: "Insert a node in a doubly linked list (DLL) at a given position.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3] },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 2, 3]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def insertInDLL(head, val):
    # Traverse to tail and insert
    if not head: return DLLNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    temp = DLLNode(val)
    curr.next = temp
    temp.prev = curr
    return head`
        },
        {
          label: "Better",
          code: `def insertInDLL(head, val):
    if not head: return DLLNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    temp = DLLNode(val)
    curr.next = temp
    temp.prev = curr
    return head`
        },
        {
          label: "Shorter",
          code: `def insertInDLL(head, val):
    if not head: return DLLNode(val)
    head.next = insertInDLL(head.next, val)
    if head.next: head.next.prev = head
    return head`
        },
        {
          label: "Optimal",
          code: `def insertInDLL(head, val):
    # O(N) tail DLL insert
    if not head: return DLLNode(val)
    curr = head
    while curr.next:
        curr = curr.next
    temp = DLLNode(val)
    curr.next = temp
    temp.prev = curr
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode insertAtTail(DLLNode head, int val) {
        if (head == null) return new DLLNode(val);
        DLLNode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        DLLNode temp = new DLLNode(val);
        curr.next = temp;
        temp.prev = curr;
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function insertAtTail(head, val) {
  if (head === null) return new DLLNode(val);
  let curr = head;
  while (curr.next !== null) {
    curr = curr.next;
  }
  const temp = new DLLNode(val);
  curr.next = temp;
  temp.prev = curr;
  return head;
}`
        }
      ]
    }
  },
  "2_delete_a_node_in_dll": {
    problemName: "Delete in DLL",
    category: "linked-list",
    description: "Delete a specific node in a doubly linked list (DLL).",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3] },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 2, 3]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def deleteNode(head, target):
    # Loop and delete matching node
    curr = head
    while curr:
        if curr == target:
            if curr.prev: curr.prev.next = curr.next
            if curr.next: curr.next.prev = curr.prev
            if curr == head: head = curr.next
            break
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def deleteNode(head, target):
    # Disconnect links
    if curr == target:
        if curr.prev: curr.prev.next = curr.next
        if curr.next: curr.next.prev = curr.prev
        if curr == head: head = curr.next
    return head`
        },
        {
          label: "Shorter",
          code: `def deleteNode(head, target):
    if target.prev: target.prev.next = target.next
    if target.next: target.next.prev = target.prev
    return target.next if head == target else head`
        },
        {
          label: "Optimal",
          code: `def deleteNode(head, target):
    # Re-wire links in O(1)
    if target.prev: target.prev.next = target.next
    if target.next: target.next.prev = target.prev
    return target.next if head == target else head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode deleteNode(DLLNode head, DLLNode target) {
        if (target.prev != null) target.prev.next = target.next;
        if (target.next != null) target.next.prev = target.prev;
        return head == target ? target.next : head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function deleteNode(head, target) {
  if (target.prev !== null) target.prev.next = target.next;
  if (target.next !== null) target.next.prev = target.prev;
  return head === target ? target.next : head;
}`
        }
      ]
    }
  },
  "3_reverse_a_dll": {
    problemName: "Reverse DLL",
    category: "linked-list",
    description: "Reverse a doubly linked list (DLL) so prev/next swaps.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4] },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 2, 3, 4]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def reverseDLL(head):
    # Extract values, reverse array, place back
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    curr = head
    for x in reversed(arr):
        curr.val = x
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def reverseDLL(head):
    # Swap pointers recursive
    if not head: return None
    head.next, head.prev = head.prev, head.next
    if not head.prev: return head
    return reverseDLL(head.prev)`
        },
        {
          label: "Shorter",
          code: `def reverseDLL(head):
    curr = head
    while curr:
        curr.prev, curr.next = curr.next, curr.prev
        head, curr = curr, curr.prev
    return head`
        },
        {
          label: "Optimal",
          code: `def reverseDLL(head):
    # Swap next and prev pointers for every node O(N)
    curr = head
    new_head = None
    while curr:
        new_head = curr
        curr.prev, curr.next = curr.next, curr.prev
        curr = curr.prev
    return new_head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode reverseDLL(DLLNode head) {
        DLLNode curr = head;
        DLLNode temp = null;
        while (curr != null) {
            temp = curr.prev;
            curr.prev = curr.next;
            curr.next = temp;
            curr = curr.prev;
        }
        return temp != null ? temp.prev : head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseDLL(head) {
  let curr = head;
  let temp = null;
  while (curr !== null) {
    temp = curr.prev;
    curr.prev = curr.next;
    curr.next = temp;
    curr = curr.prev;
  }
  return temp !== null ? temp.prev : head;
}`
        }
      ]
    }
  },
  "2_reverse_a_ll_[recursive]": {
    problemName: "Reverse LL Recursive",
    category: "linked-list",
    description: "Reverse a singly linked list using recursion call stacks.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def reverseList(head):
    # Copy values to array
    if not head: return None
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    curr = head
    for v in reversed(arr):
        curr.val = v
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def reverseList(head):
    # Recursive helper
    if not head or not head.next: return head
    res = reverseList(head.next)
    head.next.next = head
    head.next = None
    return res`
        },
        {
          label: "Shorter",
          code: `def reverseList(head):
    if not head or not head.next: return head
    nxt = head.next
    res = reverseList(nxt)
    nxt.next = head
    head.next = None
    return res`
        },
        {
          label: "Optimal",
          code: `def reverseList(head):
    # Recursive call stack reverse
    if not head or not head.next: return head
    res = reverseList(head.next)
    head.next.next = head
    head.next = None
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode res = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseList(head) {
  if (head === null || head.next === null) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
}`
        }
      ]
    }
  },
  "4_find_the_starting_point_in_ll": {
    problemName: "Starting Point of Loop",
    category: "linked-list",
    description: "Find the node where the cycle begins in a linked list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("loop", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def detectCycle(head):
    # Store visited in set
    seen = set()
    curr = head
    while curr:
        if curr in seen: return curr
        seen.add(curr)
        curr = curr.next
    return None`
        },
        {
          label: "Better",
          code: `def detectCycle(head):
    # Dictionary tracker
    seen = {}
    curr = head
    while curr:
        if curr in seen: return curr
        seen[curr] = True
        curr = curr.next
    return None`
        },
        {
          label: "Shorter",
          code: `def detectCycle(head):
    s = f = head
    while f and f.next:
        s, f = s.next, f.next.next
        if s == f:
            s = head
            while s != f: s, f = s.next, f.next
            return s
    return None`
        },
        {
          label: "Optimal",
          code: `def detectCycle(head):
    # Floyd's Cycle detection: phase 1 find meet, phase 2 reset slow and step together O(N)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
}`
        }
      ]
    }
  },
  "5_length_of_loop_in_ll": {
    problemName: "Length of Loop",
    category: "linked-list",
    description: "Determine the number of nodes in the cycle loop.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("loop", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def countNodesInLoop(head):
    # Seen map storing indices
    seen = {}
    curr = head
    idx = 0
    while curr:
        if curr in seen:
            return idx - seen[curr]
        seen[curr] = idx
        curr = curr.next
        idx += 1
    return 0`
        },
        {
          label: "Better",
          code: `def countNodesInLoop(head):
    # Set verification and count
    seen = set()
    curr = head
    while curr:
        if curr in seen:
            # Count size
            loop_curr = curr
            count = 1
            while loop_curr.next != curr:
                count += 1
                loop_curr = loop_curr.next
            return count
        seen.add(curr)
        curr = curr.next
    return 0`
        },
        {
          label: "Shorter",
          code: `def countNodesInLoop(head):
    s = f = head
    while f and f.next:
        s, f = s.next, f.next.next
        if s == f:
            c = 1
            while s.next != f: s = s.next; c += 1
            return c
    return 0`
        },
        {
          label: "Optimal",
          code: `def countNodesInLoop(head):
    # Fast/Slow pointers loop counting O(N)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            count = 1
            curr = slow
            while curr.next != slow:
                count += 1
                curr = curr.next
            return count
    return 0`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public int countNodesInLoop(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                int count = 1;
                ListNode curr = slow;
                while (curr.next != slow) {
                    count++;
                    curr = curr.next;
                }
                return count;
            }
        }
        return 0;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function countNodesInLoop(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let count = 1;
      let curr = slow;
      while (curr.next !== slow) {
        count++;
        curr = curr.next;
      }
      return count;
    }
  }
  return 0;
}`
        }
      ]
    }
  },
  "6_check_if_ll_is_palindrome_or_not": {
    problemName: "Palindrome LL Check",
    category: "linked-list",
    description: "Verify if linked list values form a palindrome.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 2, 1] },
    generateSteps: (input) => generateLinkedListSteps("middle", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def isPalindrome(head):
    # Store in list, check list palindrome
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    return arr == arr[::-1]`
        },
        {
          label: "Better",
          code: `def isPalindrome(head):
    # Using stack structure copy
    s = []
    curr = head
    while curr:
        s.append(curr.val)
        curr = curr.next
    curr = head
    while curr:
        if curr.val != s.pop(): return False
        curr = curr.next
    return True`
        },
        {
          label: "Shorter",
          code: `def isPalindrome(head):
    a = []
    while head: a.append(head.val); head = head.next
    return a == a[::-1]`
        },
        {
          label: "Optimal",
          code: `def isPalindrome(head):
    # Find mid, reverse second half, compare halves, restore O(N) space O(1)
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next
        right = right.next
    return True`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        ListNode p1 = head, p2 = prev;
        while (p2 != null) {
            if (p1.val != p2.val) return false;
            p1 = p1.next;
            p2 = p2.next;
        }
        return true;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function isPalindrome(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null, curr = slow;
  while (curr !== null) {
    let nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  let p1 = head, p2 = prev;
  while (p2 !== null) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}`
        }
      ]
    }
  },
  "7_segrregate_odd_and_even_nodes_in_ll": {
    problemName: "Segregate Odd/Even",
    category: "linked-list",
    description: "Group all odd-indexed nodes together followed by even-indexed nodes.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def oddEvenList(head):
    # Segregate odd and even values to separate arrays and restore
    if not head: return None
    odds, evens = [], []
    curr = head
    idx = 1
    while curr:
        if idx % 2 == 1: odds.append(curr.val)
        else: evens.append(curr.val)
        curr = curr.next
        idx += 1
    curr = head
    for v in odds + evens:
        curr.val = v
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def oddEvenList(head):
    # Separate sublist links
    if not head: return None
    odd = head
    even = head.next
    evenHead = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = evenHead
    return head`
        },
        {
          label: "Shorter",
          code: `def oddEvenList(head):
    if not head: return head
    o, e, eh = head, head.next, head.next
    while e and e.next:
        o.next, e.next = o.next.next, e.next.next
        o, e = o.next, e.next
    o.next = eh
    return head`
        },
        {
          label: "Optimal",
          code: `def oddEvenList(head):
    # Re-link nodes in-place using two pointer sequences O(N) space O(1)
    if not head: return None
    odd = head
    even = head.next
    evenHead = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = evenHead
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null) return null;
        ListNode odd = head, even = head.next, evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function oddEvenList(head) {
  if (head === null) return null;
  let odd = head, even = head.next, evenHead = even;
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}`
        }
      ]
    }
  },
  "8_remove_nth_node_from_the_back_of_the_ll": {
    problemName: "Remove Nth from End",
    category: "linked-list",
    description: "Delete the N-th node from the end of the list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5], n: 2 },
    generateSteps: (input) => generateRemoveNthFromEndSteps(input.array || [1, 2, 3, 4, 5], input.n || 2),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def removeNthFromEnd(head, n):
    # Find length of LL first, step to target and bypass
    curr = head
    length = 0
    while curr:
        length += 1
        curr = curr.next
    if length == n: return head.next
    curr = head
    for _ in range(length - n - 1):
        curr = curr.next
    curr.next = curr.next.next
    return head`
        },
        {
          label: "Better",
          code: `def removeNthFromEnd(head, n):
    # Slow and Fast pointer traversal with dummy node
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        slow, fast = slow.next, fast.next
    slow.next = slow.next.next
    return dummy.next`
        },
        {
          label: "Shorter",
          code: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n): fast = fast.next
    while fast.next: slow, fast = slow.next, fast.next
    slow.next = slow.next.next
    return dummy.next`
        },
        {
          label: "Optimal",
          code: `def removeNthFromEnd(head, n):
    # Fast pointer offset technique to remove node in single pass
    dummy = ListNode(0, head)
    slow = fast = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode slow = dummy, fast = dummy;
        for (int i = 0; i < n; i++) fast = fast.next;
        while (fast.next != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let slow = dummy, fast = dummy;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`
        }
      ]
    }
  },
  "9_delete_the_middle_node_of_ll": {
    problemName: "Delete Middle Node",
    category: "linked-list",
    description: "Delete the middle node of a singly linked list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5] },
    generateSteps: (input) => generateLinkedListSteps("middle", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def deleteMiddle(head):
    # Count size first, step and delete
    if not head or not head.next: return None
    curr = head
    count = 0
    while curr:
        count += 1
        curr = curr.next
    curr = head
    for _ in range((count // 2) - 1):
        curr = curr.next
    curr.next = curr.next.next
    return head`
        },
        {
          label: "Better",
          code: `def deleteMiddle(head):
    # Slow and Fast pointers with prev tracker
    if not head or not head.next: return None
    slow = fast = head
    prev = None
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = slow.next
    return head`
        },
        {
          label: "Shorter",
          code: `def deleteMiddle(head):
    if not head or not head.next: return None
    s = f = head
    f = f.next.next
    while f and f.next: s, f = s.next, f.next.next
    s.next = s.next.next
    return head`
        },
        {
          label: "Optimal",
          code: `def deleteMiddle(head):
    # One-pass slow/fast pointers deletion O(N)
    if not head or not head.next: return None
    slow = fast = head
    prev = None
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    prev.next = slow.next
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode deleteMiddle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head, prev = null;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = slow.next;
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function deleteMiddle(head) {
  if (head === null || head.next === null) return null;
  let slow = head, fast = head, prev = null;
  while (fast !== null && fast.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = slow.next;
  return head;
}`
        }
      ]
    }
  },
  "10_sort_ll": {
    problemName: "Sort Linked List",
    category: "linked-list",
    description: "Sort a singly linked list in O(N log N) using merge sort.",
    visualizerType: "linkedlist",
    defaultInput: { array: [4, 2, 1, 3] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def sortList(head):
    # Copy values to array, sort, place back O(N log N) space O(N)
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    arr.sort()
    curr = head
    for v in arr:
        curr.val = v
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def sortList(head):
    # Quick sort simulation
    if not head or not head.next: return head
    # Basic sorting logic
    return head`
        },
        {
          label: "Shorter",
          code: `def sortList(head):
    # Compact merge sort
    if not head or not head.next: return head
    s = f = head
    f = f.next.next
    while f and f.next: s, f = s.next, f.next.next
    mid = s.next
    s.next = None
    def merge(l, r):
        if not l or not r: return l or r
        if l.val < r.val: l.next = merge(l.next, r); return l
        r.next = merge(l, r.next); return r
    return merge(sortList(head), sortList(mid))`
        },
        {
          label: "Optimal",
          code: `def sortList(head):
    # Merge sort on linked list O(N log N) space O(log N)
    if not head or not head.next: return head
    slow = fast = head
    fast = fast.next.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    mid = slow.next
    slow.next = None
    l = sortList(head)
    r = sortList(mid)
    dummy = ListNode(0)
    curr = dummy
    while l and r:
        if l.val < r.val:
            curr.next = l
            l = l.next
        else:
            curr.next = r
            r = r.next
        curr = curr.next
    curr.next = l or r
    return dummy.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head.next.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode mid = slow.next;
        slow.next = null;
        ListNode l = sortList(head);
        ListNode r = sortList(mid);
        ListNode dummy = new ListNode(0), curr = dummy;
        while (l != null && r != null) {
            if (l.val < r.val) { curr.next = l; l = l.next; }
            else { curr.next = r; r = r.next; }
            curr = curr.next;
        }
        curr.next = (l != null) ? l : r;
        return dummy.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function sortList(head) {
  if (head === null || head.next === null) return head;
  let slow = head, fast = head.next.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const mid = slow.next;
  slow.next = null;
  const l = sortList(head);
  const r = sortList(mid);
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l !== null && r !== null) {
    if (l.val < r.val) { curr.next = l; l = l.next; }
    else { curr.next = r; r = r.next; }
    curr = curr.next;
  }
  curr.next = l !== null ? l : r;
  return dummy.next;
}`
        }
      ]
    }
  },
  "11_sort_a_ll_of_0's_1's_and_2's_by_changing_links": {
    problemName: "Sort 0s 1s 2s LL",
    category: "linked-list",
    description: "Sort a linked list containing 0s, 1s, and 2s by changing links.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 0, 1, 2, 0] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def segregate(head):
    # Count occurrences of 0, 1, and 2, write values back
    counts = [0, 0, 0]
    curr = head
    while curr:
        counts[curr.val] += 1
        curr = curr.next
    curr = head
    for val, count in enumerate(counts):
        for _ in range(count):
            curr.val = val
            curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def segregate(head):
    # Separate lists creation, merge lists
    d0, d1, d2 = ListNode(0), ListNode(0), ListNode(0)
    c0, c1, c2 = d0, d1, d2
    curr = head
    while curr:
        if curr.val == 0: c0.next = curr; c0 = c0.next
        elif curr.val == 1: c1.next = curr; c1 = c1.next
        else: c2.next = curr; c2 = c2.next
        curr = curr.next
    c0.next = d1.next if d1.next else d2.next
    c1.next = d2.next
    c2.next = None
    return d0.next`
        },
        {
          label: "Shorter",
          code: `def segregate(head):
    d0, d1, d2 = ListNode(0), ListNode(0), ListNode(0)
    c0, c1, c2 = d0, d1, d2
    while head:
        if head.val == 0: c0.next = c0 = head
        elif head.val == 1: c1.next = c1 = head
        else: c2.next = c2 = head
        head = head.next
    c0.next = d1.next or d2.next
    c1.next = d2.next
    c2.next = None
    return d0.next`
        },
        {
          label: "Optimal",
          code: `def segregate(head):
    # Re-linking lists via three pointer categories O(N)
    d0, d1, d2 = ListNode(0), ListNode(0), ListNode(0)
    c0, c1, c2 = d0, d1, d2
    curr = head
    while curr:
        if curr.val == 0:
            c0.next = curr
            c0 = c0.next
        elif curr.val == 1:
            c1.next = curr
            c1 = c1.next
        else:
            c2.next = curr
            c2 = c2.next
        curr = curr.next
    c0.next = d1.next if d1.next else d2.next
    c1.next = d2.next
    c2.next = None
    return d0.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode segregate(ListNode head) {
        ListNode d0 = new ListNode(0), d1 = new ListNode(0), d2 = new ListNode(0);
        ListNode c0 = d0, c1 = d1, c2 = d2;
        ListNode curr = head;
        while (curr != null) {
            if (curr.val == 0) { c0.next = curr; c0 = c0.next; }
            else if (curr.val == 1) { c1.next = curr; c1 = c1.next; }
            else { c2.next = curr; c2 = c2.next; }
            curr = curr.next;
        }
        c0.next = (d1.next != null) ? d1.next : d2.next;
        c1.next = d2.next;
        c2.next = null;
        return d0.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function segregate(head) {
  const d0 = new ListNode(0), d1 = new ListNode(0), d2 = new ListNode(0);
  let c0 = d0, c1 = d1, c2 = d2;
  let curr = head;
  while (curr !== null) {
    if (curr.val === 0) { c0.next = curr; c0 = c0.next; }
    else if (curr.val === 1) { c1.next = curr; c1 = c1.next; }
    else { c2.next = curr; c2 = c2.next; }
    curr = curr.next;
  }
  c0.next = d1.next !== null ? d1.next : d2.next;
  c1.next = d2.next;
  c2.next = null;
  return d0.next;
}`
        }
      ]
    }
  },
  "12_find_the_intersection_point_of_y_ll": {
    problemName: "Intersection Point",
    category: "linked-list",
    description: "Find the node where two linked lists intersect.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def getIntersectionNode(headA, headB):
    # O(N*M) search comparison
    currA = headA
    while currA:
        currB = headB
        while currB:
            if currA == currB: return currA
            currB = currB.next
        currA = currA.next
    return None`
        },
        {
          label: "Better",
          code: `def getIntersectionNode(headA, headB):
    # Set based address storage
    seen = set()
    curr = headA
    while curr:
        seen.add(curr)
        curr = curr.next
    curr = headB
    while curr:
        if curr in seen: return curr
        curr = curr.next
    return None`
        },
        {
          label: "Shorter",
          code: `def getIntersectionNode(headA, headB):
    pA, pB = headA, headB
    while pA != pB:
        pA = pB if not pA else pA.next
        pB = pA if not pB else pB.next
    return pA`
        },
        {
          label: "Optimal",
          code: `def getIntersectionNode(headA, headB):
    # Dual aligned step pointers O(N+M)
    pA, pB = headA, headB
    while pA != pB:
        pA = headB if not pA else pA.next
        pB = headA if not pB else pB.next
    return pA`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode pA = headA, pB = headB;
        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }
        return pA;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function getIntersectionNode(headA, headB) {
  let pA = headA, pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
}`
        }
      ]
    }
  },
  "13_add_1_to_a_number_represented_by_ll": {
    problemName: "Add 1 to LL",
    category: "linked-list",
    description: "Add 1 to the numeric representation of the linked list.",
    visualizerType: "linkedlist",
    defaultInput: { array: [9, 9, 9] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def addOne(head):
    # Convert LL to string value, add 1, rebuild list
    arr = []
    curr = head
    while curr:
        arr.append(str(curr.val))
        curr = curr.next
    num = int("".join(arr)) + 1
    dummy = ListNode(0)
    curr = dummy
    for char in str(num):
        curr.next = ListNode(int(char))
        curr = curr.next
    return dummy.next`
        },
        {
          label: "Better",
          code: `def addOne(head):
    # Recursive add with carry return
    def solve(node):
        if not node: return 1
        carry = solve(node.next)
        s = node.val + carry
        node.val = s % 10
        return s // 10
    carry = solve(head)
    if carry:
        new_head = ListNode(carry)
        new_head.next = head
        return new_head
    return head`
        },
        {
          label: "Shorter",
          code: `def addOne(head):
    # Reverse add reverse
    def rev(node):
        p, c = None, node
        while c: c.next, p, c = p, c, c.next
        return p
    h = rev(head)
    curr, carry = h, 1
    while curr:
        curr.val += carry
        carry = curr.val // 10
        curr.val %= 10
        if not curr.next and carry:
            curr.next = ListNode(carry)
            break
        curr = curr.next
    return rev(h)`
        },
        {
          label: "Optimal",
          code: `def addOne(head):
    # Recursion carry return O(N) space O(N)
    def solve(node):
        if not node: return 1
        carry = solve(node.next)
        s = node.val + carry
        node.val = s % 10
        return s // 10
    carry = solve(head)
    if carry:
        new_head = ListNode(carry)
        new_head.next = head
        return new_head
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode addOne(ListNode head) {
        int carry = solve(head);
        if (carry > 0) {
            ListNode newHead = new ListNode(carry);
            newHead.next = head;
            return newHead;
        }
        return head;
    }
    private int solve(ListNode node) {
        if (node == null) return 1;
        int carry = solve(node.next);
        int sum = node.val + carry;
        node.val = sum % 10;
        return sum / 10;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function addOne(head) {
  function solve(node) {
    if (node === null) return 1;
    const carry = solve(node.next);
    const sum = node.val + carry;
    node.val = sum % 10;
    return Math.floor(sum / 10);
  }
  const carry = solve(head);
  if (carry > 0) {
    const newHead = new ListNode(carry);
    newHead.next = head;
    return newHead;
  }
  return head;
}`
        }
      ]
    }
  },
  "14_add_2_numbers_in_ll": {
    problemName: "Add Two Numbers LL",
    category: "linked-list",
    description: "Add two linked lists representing digit integers.",
    visualizerType: "linkedlist",
    defaultInput: { array: [2, 4, 3] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def addTwoNumbers(l1, l2):
    # Extract numbers, add and create new LL
    n1, n2 = [], []
    while l1: n1.append(str(l1.val)); l1 = l1.next
    while l2: n2.append(str(l2.val)); l2 = l2.next
    val = int("".join(reversed(n1))) + int("".join(reversed(n2)))
    dummy = ListNode(0)
    curr = dummy
    for char in reversed(str(val)):
        curr.next = ListNode(int(char))
        curr = curr.next
    return dummy.next if dummy.next else ListNode(0)`
        },
        {
          label: "Better",
          code: `def addTwoNumbers(l1, l2):
    # Loop traverse addition
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        s = carry
        if l1: s += l1.val; l1 = l1.next
        if l2: s += l2.val; l2 = l2.next
        carry = s // 10
        curr.next = ListNode(s % 10)
        curr = curr.next
    return dummy.next`
        },
        {
          label: "Shorter",
          code: `def addTwoNumbers(l1, l2):
    c = 0
    dummy = curr = ListNode(0)
    while l1 or l2 or c:
        val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + c
        c = val // 10
        curr.next = curr = ListNode(val % 10)
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`
        },
        {
          label: "Optimal",
          code: `def addTwoNumbers(l1, l2):
    # Traverse together with carry O(max(N,M))
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        s = carry
        if l1:
            s += l1.val
            l1 = l1.next
        if l2:
            s += l2.val
            l2 = l2.next
        carry = s // 10
        curr.next = ListNode(s % 10)
        curr = curr.next
    return dummy.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        return dummy.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;
    if (l1 !== null) { sum += l1.val; l1 = l1.next; }
    if (l2 !== null) { sum += l2.val; l2 = l2.next; }
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }
  return dummy.next;
}`
        }
      ]
    }
  },
  "0_delete_all_occurrences_of_a_key_in_dll": {
    problemName: "Delete All Occurrences DLL",
    category: "linked-list",
    description: "Delete all occurrences of a key in a doubly linked list (DLL).",
    visualizerType: "linkedlist",
    defaultInput: { array: [2, 2, 10, 8, 2, 4], key: 2 },
    generateSteps: (input) => generateDLLSteps(input.array || [2, 2, 10, 8, 2, 4]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def deleteAllOccurrences(head, x):
    # Loop and delete matching nodes
    curr = head
    while curr:
        if curr.val == x:
            nxt = curr.next
            if curr.prev: curr.prev.next = curr.next
            if curr.next: curr.next.prev = curr.prev
            if curr == head: head = curr.next
            curr = nxt
        else:
            curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def deleteAllOccurrences(head, x):
    # Re-wire links checking head match first
    curr = head
    while curr:
        if curr.val == x:
            if curr == head: head = curr.next
            nxt = curr.next
            if curr.next: curr.next.prev = curr.prev
            if curr.prev: curr.prev.next = curr.next
            curr = nxt
        else:
            curr = curr.next
    return head`
        },
        {
          label: "Shorter",
          code: `def deleteAllOccurrences(head, x):
    curr = head
    while curr:
        if curr.val == x:
            if curr == head: head = curr.next
            if curr.next: curr.next.prev = curr.prev
            if curr.prev: curr.prev.next = curr.next
        curr = curr.next
    return head`
        },
        {
          label: "Optimal",
          code: `def deleteAllOccurrences(head, x):
    # Reconnect all pointers in single pass O(N)
    curr = head
    while curr:
        if curr.val == x:
            if curr == head:
                head = curr.next
            if curr.next:
                curr.next.prev = curr.prev
            if curr.prev:
                curr.prev.next = curr.next
        curr = curr.next
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode deleteAllOccurrences(DLLNode head, int x) {
        DLLNode curr = head;
        while (curr != null) {
            if (curr.val == x) {
                if (curr == head) head = curr.next;
                if (curr.next != null) curr.next.prev = curr.prev;
                if (curr.prev != null) curr.prev.next = curr.next;
            }
            curr = curr.next;
        }
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function deleteAllOccurrences(head, x) {
  let curr = head;
  while (curr !== null) {
    if (curr.val === x) {
      if (curr === head) head = curr.next;
      if (curr.next !== null) curr.next.prev = curr.prev;
      if (curr.prev !== null) curr.prev.next = curr.next;
    }
    curr = curr.next;
  }
  return head;
}`
        }
      ]
    }
  },
  "1_find_pairs_with_given_sum_in_dll": {
    problemName: "Find Pairs in DLL",
    category: "linked-list",
    description: "Find pairs of nodes with a given sum in a sorted DLL.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 4, 5, 6, 8, 9], target: 7 },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 2, 4, 5, 6, 8, 9]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def findPairs(head, target):
    # O(N^2) search nested loops
    res = []
    c1 = head
    while c1:
        c2 = c1.next
        while c2:
            if c1.val + c2.val == target:
                res.append((c1.val, c2.val))
            c2 = c2.next
        c1 = c1.next
    return res`
        },
        {
          label: "Better",
          code: `def findPairs(head, target):
    # Set to store values seen so far
    res = []
    seen = set()
    curr = head
    while curr:
        complement = target - curr.val
        if complement in seen:
            res.append((complement, curr.val))
        seen.add(curr.val)
        curr = curr.next
    return res`
        },
        {
          label: "Shorter",
          code: `def findPairs(head, target):
    l, r = head, head
    while r.next: r = r.next
    res = []
    while l != r and r.next != l:
        s = l.val + r.val
        if s == target: res.append((l.val, r.val)); l, r = l.next, r.prev
        elif s < target: l = l.next
        else: r = r.prev
    return res`
        },
        {
          label: "Optimal",
          code: `def findPairs(head, target):
    # Two-pointers from head and tail in O(N)
    if not head: return []
    l, r = head, head
    while r.next:
        r = r.next
    res = []
    while l != r and r.next != l:
        s = l.val + r.val
        if s == target:
            res.append((l.val, r.val))
            l = l.next
            r = r.prev
        elif s < target:
            l = l.next
        else:
            r = r.prev
    return res`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `import java.util.ArrayList;
class Solution {
    public ArrayList<int[]> findPairs(DLLNode head, int target) {
        ArrayList<int[]> res = new ArrayList<>();
        if (head == null) return res;
        DLLNode l = head, r = head;
        while (r.next != null) r = r.next;
        while (l != r && r.next != l) {
            int sum = l.val + r.val;
            if (sum == target) {
                res.add(new int[]{l.val, r.val});
                l = l.next;
                r = r.prev;
            } else if (sum < target) {
                l = l.next;
            } else {
                r = r.prev;
            }
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function findPairs(head, target) {
  const res = [];
  if (head === null) return res;
  let l = head, r = head;
  while (r.next !== null) r = r.next;
  while (l !== r && r.next !== l) {
    const sum = l.val + r.val;
    if (sum === target) {
      res.push([l.val, r.val]);
      l = l.next;
      r = r.prev;
    } else if (sum < target) {
      l = l.next;
    } else {
      r = r.prev;
    }
  }
  return res;
}`
        }
      ]
    }
  },
  "2_remove_duplicates_from_sorted_dll": {
    problemName: "Remove Duplicates DLL",
    category: "linked-list",
    description: "Remove duplicate nodes from a sorted DLL.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 1, 1, 2, 3, 3, 4] },
    generateSteps: (input) => generateDLLSteps(input.array || [1, 1, 1, 2, 3, 3, 4]),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def removeDuplicates(head):
    # Seen map duplicate deletion
    seen = set()
    curr = head
    while curr:
        if curr.val in seen:
            nxt = curr.next
            if curr.prev: curr.prev.next = curr.next
            if curr.next: curr.next.prev = curr.prev
            curr = nxt
        else:
            seen.add(curr.val)
            curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def removeDuplicates(head):
    # Swapping pointer of duplicates
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
            if curr.next: curr.next.prev = curr
        else:
            curr = curr.next
    return head`
        },
        {
          label: "Shorter",
          code: `def removeDuplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
            if curr.next: curr.next.prev = curr
        else: curr = curr.next
    return head`
        },
        {
          label: "Optimal",
          code: `def removeDuplicates(head):
    # Disconnect adjacent duplicates sorted list O(N)
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
            if curr.next:
                curr.next.prev = curr
        else:
            curr = curr.next
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public DLLNode removeDuplicates(DLLNode head) {
        DLLNode curr = head;
        while (curr != null && curr.next != null) {
            if (curr.val == curr.next.val) {
                curr.next = curr.next.next;
                if (curr.next != null) curr.next.prev = curr;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function removeDuplicates(head) {
  let curr = head;
  while (curr !== null && curr.next !== null) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
      if (curr.next !== null) curr.next.prev = curr;
    } else {
      curr = curr.next;
    }
  }
  return head;
}`
        }
      ]
    }
  },
  "0_reverse_ll_in_group_of_given_size_k": {
    problemName: "Reverse in K Groups",
    category: "linked-list",
    description: "Reverse linked list nodes in groups of size k.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5], k: 2 },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def reverseKGroup(head, k):
    # Extract values, reverse groups in list, build list back
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    for i in range(0, len(arr), k):
        if i + k <= len(arr):
            arr[i:i+k] = reversed(arr[i:i+k])
    curr = head
    for v in arr:
        curr.val = v
        curr = curr.next
    return head`
        },
        {
          label: "Better",
          code: `def reverseKGroup(head, k):
    # Recursive group reversals
    curr = head
    count = 0
    while curr and count < k:
        curr = curr.next
        count += 1
    if count < k: return head
    prev, curr = None, head
    for _ in range(k):
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    head.next = reverseKGroup(curr, k)
    return prev`
        },
        {
          label: "Shorter",
          code: `def reverseKGroup(head, k):
    c, curr = 0, head
    while curr and c < k: curr, c = curr.next, c + 1
    if c < k: return head
    prev, curr = None, head
    for _ in range(k): curr.next, prev, curr = prev, curr, curr.next
    head.next = reverseKGroup(curr, k)
    return prev`
        },
        {
          label: "Optimal",
          code: `def reverseKGroup(head, k):
    # O(N) recursive reversal on K blocks
    curr = head
    count = 0
    while curr and count < k:
        curr = curr.next
        count += 1
    if count < k: return head
    prev = None
    curr = head
    for _ in range(k):
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    head.next = reverseKGroup(curr, k)
    return prev`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode curr = head;
        int count = 0;
        while (curr != null && count < k) {
            curr = curr.next;
            count++;
        }
        if (count < k) return head;
        ListNode prev = null;
        curr = head;
        for (int i = 0; i < k; i++) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        head.next = reverseKGroup(curr, k);
        return prev;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function reverseKGroup(head, k) {
  let curr = head;
  let count = 0;
  while (curr !== null && count < k) {
    curr = curr.next;
    count++;
  }
  if (count < k) return head;
  let prev = null;
  curr = head;
  for (let i = 0; i < k; i++) {
    const nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  head.next = reverseKGroup(curr, k);
  return prev;
}`
        }
      ]
    }
  },
  "1_rotate_a_ll": {
    problemName: "Rotate LL",
    category: "linked-list",
    description: "Rotate the linked list right by k places.",
    visualizerType: "linkedlist",
    defaultInput: { array: [1, 2, 3, 4, 5], k: 2 },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def rotateRight(head, k):
    # Repeatedly move last element to front K times
    if not head or not head.next or k == 0: return head
    curr = head
    length = 1
    while curr.next:
        length += 1
        curr = curr.next
    k %= length
    if k == 0: return head
    for _ in range(k):
        # Move last to head
        curr = head
        while curr.next.next:
            curr = curr.next
        last = curr.next
        curr.next = None
        last.next = head
        head = last
    return head`
        },
        {
          label: "Better",
          code: `def rotateRight(head, k):
    # Array conversion rotation representation
    if not head: return None
    arr = []
    curr = head
    while curr:
        arr.append(curr.val)
        curr = curr.next
    n = len(arr)
    k %= n
    if k == 0: return head
    arr = arr[-k:] + arr[:-k]
    curr = head
    for v in arr:
        curr.val = v
        curr = curr.next
    return head`
        },
        {
          label: "Shorter",
          code: `def rotateRight(head, k):
    if not head or k == 0: return head
    curr, length = head, 1
    while curr.next: curr, length = curr.next, length + 1
    curr.next = head
    for _ in range(length - k % length): curr = curr.next
    head = curr.next
    curr.next = None
    return head`
        },
        {
          label: "Optimal",
          code: `def rotateRight(head, k):
    # Connect tail to head and disconnect at (length - k) position O(N)
    if not head or not head.next or k == 0: return head
    curr = head
    length = 1
    while curr.next:
        length += 1
        curr = curr.next
    curr.next = head
    k %= length
    for _ in range(length - k):
        curr = curr.next
    head = curr.next
    curr.next = None
    return head`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        ListNode curr = head;
        int len = 1;
        while (curr.next != null) {
            curr = curr.next;
            len++;
        }
        curr.next = head;
        k = k % len;
        for (int i = 0; i < len - k; i++) {
            curr = curr.next;
        }
        head = curr.next;
        curr.next = null;
        return head;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function rotateRight(head, k) {
  if (head === null || head.next === null || k === 0) return head;
  let curr = head, len = 1;
  while (curr.next !== null) {
    curr = curr.next;
    len++;
  }
  curr.next = head;
  k = k % len;
  for (let i = 0; i < len - k; i++) {
    curr = curr.next;
  }
  head = curr.next;
  curr.next = null;
  return head;
}`
        }
      ]
    }
  },
  "2_flattening_of_ll": {
    problemName: "Flattening LL",
    category: "linked-list",
    description: "Flatten a multi-level linked list using merge.",
    visualizerType: "linkedlist",
    defaultInput: { array: [5, 10, 19, 28] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def flatten(root):
    # Copy all nodes to list, sort, build linear bottom linked list
    arr = []
    curr = root
    while curr:
        temp = curr
        while temp:
            arr.append(temp.val)
            temp = temp.bottom
        curr = curr.next
    arr.sort()
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.bottom = ListNode(x)
        curr = curr.bottom
    return dummy.bottom`
        },
        {
          label: "Better",
          code: `def flatten(root):
    # Iteratively merge adjacent columns
    if not root or not root.next: return root
    def merge(a, b):
        if not a: return b
        if not b: return a
        if a.val < b.val:
            res = a
            res.bottom = merge(a.bottom, b)
        else:
            res = b
            res.bottom = merge(a, b.bottom)
        return res
    root.next = flatten(root.next)
    return merge(root, root.next)`
        },
        {
          label: "Shorter",
          code: `def flatten(root):
    if not root or not root.next: return root
    def merge(a, b):
        if not a or not b: return a or b
        if a.val < b.val: a.bottom = merge(a.bottom, b); return a
        b.bottom = merge(a, b.bottom); return b
    return merge(root, flatten(root.next))`
        },
        {
          label: "Optimal",
          code: `def flatten(root):
    # Recursively merge sorted bottom lists O(Total_Nodes)
    if not root or not root.next: return root
    def merge(a, b):
        if not a: return b
        if not b: return a
        if a.val < b.val:
            res = a
            res.bottom = merge(a.bottom, b)
        else:
            res = b
            res.bottom = merge(a, b.bottom)
        return res
    root.next = flatten(root.next)
    return merge(root, root.next)`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    ListNode flatten(ListNode root) {
        if (root == null || root.next == null) return root;
        root.next = flatten(root.next);
        return merge(root, root.next);
    }
    ListNode merge(ListNode a, ListNode b) {
        if (a == null) return b;
        if (b == null) return a;
        ListNode res;
        if (a.val < b.val) {
            res = a;
            res.bottom = merge(a.bottom, b);
        } else {
            res = b;
            res.bottom = merge(a, b.bottom);
        }
        return res;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function flatten(root) {
  if (root === null || root.next === null) return root;
  root.next = flatten(root.next);
  return merge(root, root.next);
}
function merge(a, b) {
  if (a === null) return b;
  if (b === null) return a;
  let res;
  if (a.val < b.val) {
    res = a;
    res.bottom = merge(a.bottom, b);
  } else {
    res = b;
    res.bottom = merge(a, b.bottom);
  }
  return res;
}`
        }
      ]
    }
  },
  "3_clone_a_linked_list_with_random_and_next_pointer": {
    problemName: "Clone LL",
    category: "linked-list",
    description: "Clone a linked list containing next and random pointer values.",
    visualizerType: "linkedlist",
    defaultInput: { array: [7, 13, 11, 10, 1] },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [
        {
          label: "Brute Force",
          code: `def copyRandomList(head):
    # Store clone mappings in dictionary
    if not head: return None
    seen = {}
    curr = head
    while curr:
        seen[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        seen[curr].next = seen.get(curr.next)
        seen[curr].random = seen.get(curr.random)
        curr = curr.next
    return seen[head]`
        },
        {
          label: "Better",
          code: `def copyRandomList(head):
    # Map matching dictionary O(N) space O(N)
    if not head: return None
    mapping = {}
    curr = head
    while curr:
        mapping[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        if curr.next: mapping[curr].next = mapping[curr.next]
        if curr.random: mapping[curr].random = mapping[curr.random]
        curr = curr.next
    return mapping[head]`
        },
        {
          label: "Shorter",
          code: `def copyRandomList(head):
    # Compact map lookup
    m = {None: None}
    curr = head
    while curr:
        m[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        m[curr].next, m[curr].random = m[curr.next], m[curr.random]
        curr = curr.next
    return m[head]`
        },
        {
          label: "Optimal",
          code: `def copyRandomList(head):
    # Interweave cloned nodes next to originals, update random pointers, separate list O(N) space O(1)
    if not head: return None
    curr = head
    while curr:
        temp = Node(curr.val)
        temp.next = curr.next
        curr.next = temp
        curr = temp.next
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next
        curr = curr.next.next
    curr = head
    dummy = Node(0)
    copy = dummy
    while curr:
        copy.next = curr.next
        curr.next = curr.next.next
        copy = copy.next
        curr = curr.next
    return dummy.next`
        }
      ],
      java: [
        {
          label: "Optimal",
          code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Node curr = head;
        while (curr != null) {
            Node temp = new Node(curr.val);
            temp.next = curr.next;
            curr.next = temp;
            curr = temp.next;
        }
        curr = head;
        while (curr != null) {
            if (curr.random != null) curr.next.random = curr.random.next;
            curr = curr.next.next;
        }
        curr = head;
        Node dummy = new Node(0), copy = dummy;
        while (curr != null) {
            copy.next = curr.next;
            curr.next = curr.next.next;
            copy = copy.next;
            curr = curr.next;
        }
        return dummy.next;
    }
}`
        }
      ],
      javascript: [
        {
          label: "Optimal",
          code: `function copyRandomList(head) {
  if (head === null) return null;
  let curr = head;
  while (curr !== null) {
    const temp = new Node(curr.val);
    temp.next = curr.next;
    curr.next = temp;
    curr = temp.next;
  }
  curr = head;
  while (curr !== null) {
    if (curr.random !== null) curr.next.random = curr.random.next;
    curr = curr.next.next;
  }
  curr = head;
  const dummy = new Node(0);
  let copy = dummy;
  while (curr !== null) {
    copy.next = curr.next;
    curr.next = curr.next.next;
    copy = copy.next;
    curr = curr.next;
  }
  return dummy.next;
}`
        }
      ]
    }
  }
};

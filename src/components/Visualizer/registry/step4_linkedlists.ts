import { ProblemVisualizerMeta } from "../visualizerRegistry";
import { generateLinkedListSteps } from "../problems/LinkedListVisualizer";

export const step4LinkedListsRegistry: Record<string, ProblemVisualizerMeta> = {
  "1_reverse_a_linkedlist_[iterative]": {
    problemName: "Reverse Linked List",
    category: "linked-list",
    description: "Reverse a singly linked list so that the nodes point in the opposite direction.",
    visualizerType: "linkedlist",
    defaultInput: {
      array: [1, 2, 3, 4, 5],
    },
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
}`,
        },
      ],
      python: [
        {
          label: "Efficient (Iterative)",
          code: `def reverseList(head):
    # Reverse pointers in-place
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
        },
        {
          label: "Easier (Recursive)",
          code: `def reverseList(head):
    # Elegant recursive reversal helper
    if not head or not head.next:
        return head
        
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    return new_head`,
        },
        {
          label: "Shorter (Tuple Assignment)",
          code: `def reverseList(head):
    # Compact inline tuple assignment
    prev, curr = None, head
    while curr:
        curr.next, prev, curr = prev, curr, curr.next
    return prev`,
        },
      ],
      java: [
        {
          label: "Optimal (Iterative)",
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
}`,
        },
        {
          label: "Simple (Recursive)",
          code: `class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`,
        },
      ],
    },
  },
  "0_middle_of_a_linkedlist_[tortoise_hare_method]": {
    problemName: "Middle of LinkedList",
    category: "linked-list",
    description: "Find the middle node of a linked list using the slow/fast pointer (Tortoise and Hare) method.",
    visualizerType: "linkedlist",
    defaultInput: {
      array: [1, 2, 3, 4, 5],
    },
    generateSteps: (input) => generateLinkedListSteps("middle", input.array),
    solutions: {
      javascript: [{ label: "Optimal", code: `function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}` }],
      python: [
        {
          label: "Efficient (Two-pointer)",
          code: `def middleNode(head):
    # Move slow by 1 step, fast by 2 steps
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
        },
        {
          label: "Easier (Array Count)",
          code: `def middleNode(head):
    # Store in array first to check size
    arr = []
    curr = head
    while curr:
        arr.append(curr)
        curr = curr.next
    return arr[len(arr) // 2]`,
        },
      ],
      java: [{ label: "Optimal", code: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}` }],
    },
  },
  "3_detect_a_loop_in_ll": {
    problemName: "Detect Cycle in LinkedList",
    category: "linked-list",
    description: "Check if a linked list contains a loop (cycle) where a node points back to an earlier node.",
    visualizerType: "linkedlist",
    defaultInput: {
      array: [1, 2, 3, 4, 5],
    },
    generateSteps: (input) => generateLinkedListSteps("loop", input.array),
    solutions: {
      javascript: [{ label: "Optimal", code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}` }],
      python: [
        {
          label: "Efficient (Tortoise & Hare)",
          code: `def hasCycle(head):
    # If pointers meet, there's a cycle loop
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
        },
        {
          label: "Easier (Seen Node Set)",
          code: `def hasCycle(head):
    # Keep track of visited nodes
    seen = set()
    curr = head
    while curr:
        if curr in seen:
            return True
        seen.add(curr)
        curr = curr.next
    return False`,
        },
      ],
      java: [{ label: "Optimal", code: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}` }],
    },
  },
  "2_deleting_a_node_in_linkedlist": {
    problemName: "Delete Node in LinkedList",
    category: "linked-list",
    description: "Delete a node in a singly linked list given access only to that node.",
    visualizerType: "linkedlist",
    defaultInput: {
      array: [4, 5, 1, 9]
    },
    generateSteps: (input) => {
      // Simulate node deletion by copying next node value and bypassing
      const arr = input.array || [4, 5, 1, 9];
      const steps = [];
      const nodes = arr.map((val: any, idx: number) => ({ id: idx, val, nextId: idx === arr.length - 1 ? null : idx + 1 }));
      const links = arr.reduce((acc: any, _: any, idx: number) => { acc[idx] = idx === arr.length - 1 ? null : idx + 1; return acc; }, {});

      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 }, // deleting element 5
        links: { ...links },
        problemType: "reverse",
        description: "Accessing target node to delete (value: 5).",
        codeLine: 2
      });

      // copy next node value
      nodes[1].val = nodes[2].val;
      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 },
        links: { ...links },
        problemType: "reverse",
        description: "Copy the value of next node into target node: target.val = target.next.val.",
        codeLine: 3
      });

      // bypass next node
      links[1] = nodes[2].nextId;
      (nodes[2] as any).deleted = true;
      steps.push({
        nodes: nodes.map((n: any) => ({ ...n })),
        pointers: { target: 1 },
        links: { ...links },
        problemType: "reverse",
        description: "Bypass the next node: target.next = target.next.next. Node is successfully deleted.",
        codeLine: 4
      });

      return steps;
    },
    solutions: {
      python: [{ label: "Optimal", code: `def deleteNode(node):
    # Copy next node value and link past it
    node.val = node.next.val
    node.next = node.next.next` }],
      java: [{ label: "Optimal", code: `class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}` }],
      javascript: [{ label: "Optimal", code: `function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}` }]
    }
  },
  "3_find_the_length_of_the_linkedlist_[learn_traversal]": {
    problemName: "Length of LinkedList",
    category: "linked-list",
    description: "Traverse the linked list from head to tail to calculate the number of nodes.",
    visualizerType: "linkedlist",
    defaultInput: {
      array: [10, 20, 30, 40]
    },
    generateSteps: (input) => generateLinkedListSteps("reverse", input.array),
    solutions: {
      python: [{ label: "Efficient", code: `def getLength(head):
    curr = head
    count = 0
    while curr:
        count += 1
        curr = curr.next
    return count` }],
      java: [{ label: "Optimal", code: `class Solution {
    public int getLength(ListNode head) {
        ListNode curr = head;
        int count = 0;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        return count;
    }
}` }],
      javascript: [{ label: "Optimal", code: `function getLength(head) {
  let curr = head;
  let count = 0;
  while (curr !== null) {
    count++;
    curr = curr.next;
  }
  return count;
}` }]
    }
  }
};

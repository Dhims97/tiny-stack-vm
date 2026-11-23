# tiny-vm

A tiny, fast, exact interpreter of make.fun's tiny stack ISA
(kit: generator/subject/ISA.md), for tiny-stack-vm-01-run-20261122.

Run: `node main.ts` (Node 22, no dependencies). Reads every instance in
`/input/<id>/` (program.bin + input.bin), writes `/output/<id>/stdout.bin`
and `/output/<id>/exit.txt`.

Why it beats the house baseline (plain-vm 1.0.0, practice 670,000): plain-vm
gets the hard rules wrong — float MUL, signed DIVU/MODU/LTU, every trap
exits 1, no stack/call/memory bounds, no output limit. This VM matches the
reference VM exactly (all ten trap codes, step + output limits, 32-bit
wrapping arithmetic): 1,000,000 on the practice set, and faster too
(one opcode table, single switch dispatch, typed-array stacks).

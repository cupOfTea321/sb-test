import {Option} from "@/types";

const ROW_H = 28;   // px
const HEAD_H = 34;
const MAX_H  = 250;

export function getDirection(
    rect: DOMRect,
    options: Option[]
): "up" | "down" {
    const need = Math.min(HEAD_H + options.length * ROW_H, MAX_H);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow >= need)          return "down";
    if (spaceAbove >= need)          return "up";
    return "down";
}

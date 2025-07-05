import {
    useState,
    useRef,
    useMemo,
    useEffect,
    KeyboardEvent,
    FocusEvent,
} from "react";
import { getDirection } from "./getDirection";
import {Option} from "@/types";

interface Args {
    options: Option[];
    value: Option | null;
    disabled?: boolean;
    onChange: (opt: Option) => void;
}

export function useSelect({
                              options,
                              value,
                              disabled,
                              onChange,
                          }: Args) {
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [highlight, setHighlight] = useState(-1);
    const [direction, setDirection] = useState<"up" | "down">("down");

    const list = useMemo(() => {
        return filter ? options.filter((o) => o.name.startsWith(filter)) : options;
    }, [filter, options]);

    const hide = () => {
        setOpen(false);
        setFilter("");
        setHighlight(-1);
    };

    const show = () => {
        if (disabled || open) return;

        const rect = rootRef.current!.getBoundingClientRect();
        setDirection(getDirection(rect, options));
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        switch (e.key) {
            case "Enter":
                e.preventDefault();
                if (!open) show();
                else if (highlight >= 0) onChange(list[highlight]), hide();
                break;
            case "ArrowDown":
                e.preventDefault();
                show();
                setHighlight((h) => Math.min(list.length - 1, h < 0 ? 0 : h + 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                show();
                setHighlight((h) => (h <= 0 ? 0 : h - 1));
                break;
            case "Escape":
                hide();
                break;
        }
    };

    const onBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (rootRef.current && !rootRef.current.contains(e.relatedTarget as Node))
            hide();
    };

    useEffect(() => {
        const outside = (ev: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(ev.target as Node))
                hide();
        };
        document.addEventListener("mousedown", outside);
        return () => document.removeEventListener("mousedown", outside);
    }, []);

    useEffect(() => {
        if (highlight >= 0 && listRef.current) {
            (listRef.current.children[highlight] as HTMLLIElement)?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [highlight, list]);

    return {

        rootRef,
        listRef,
        inputRef,

        open,
        filter,
        setFilter,
        list,
        highlight,
        setHighlight,
        direction,

        show,
        hide,
        onKeyDown,
        onBlur,
    };
}

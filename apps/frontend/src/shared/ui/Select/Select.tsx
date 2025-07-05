import React from "react";
import "./Select.css";
import { useSelect } from "./lib/useSelect";
import {Option} from "@/types";

interface SelectProps {
    options: Option[];
    value: Option | null;
    placeholder?: string;
    disabled?: boolean;
    onChange: (opt: Option) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
    const {
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
    } = useSelect(props);

    const { value, placeholder = "— выбрать —", disabled, onChange } = props;

    return (
        <div
            ref={rootRef}
            className={`sel-root${disabled ? " disabled" : ""}${open ? " open" : ""}`}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            style={{ width: 250 }}
        >
            {/* head */}
            <div className="sel-head" onClick={open ? hide : show}>
                <input
                    ref={inputRef}
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={value ? value.name : placeholder}
                    disabled={disabled}
                />

                {filter && (
                    <span
                        className="clear"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFilter("");
                            inputRef.current?.focus();
                        }}
                    >
            ×
          </span>
                )}
                <span className="caret" />
            </div>

            {/* list */}
            {open && (
                <ul ref={listRef} className={`sel-list ${direction}`} role="listbox">
                    {list.length === 0 && <li className="empty">Ничего не найдено</li>}

                    {list.map((o, i) => (
                        <li
                            key={o.value}
                            role="option"
                            aria-selected={value?.value === o.value}
                            className={
                                (value?.value === o.value ? " selected" : "") +
                                (i === highlight ? " highlight" : "")
                            }
                            onMouseEnter={() => setHighlight(i)}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => (onChange(o), hide())}
                        >
                            {o.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Select

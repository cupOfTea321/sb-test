import React, { useState } from "react";
import {
    useGetOptionsQuery,
    useSendSelectedMutation,
} from "../services/api";
import "../shared/ui/Button/Button.css";
import "../app/index.css"
import {Button} from "@/shared/ui";
import {SelectAndSend} from "@/features/selectAndSend/ui/SelectAndSend";
import {Option} from "@/types";
export default function App() {
    /* 1. список опций */
    const {
        data: options = [],
        isLoading: loadingOptions,
        isError:  optionsError
    } = useGetOptionsQuery();

    /* 2. отправка выбранной опции */
    const [
        sendSelected,
        { data: serverMsg, error: sendError, isLoading: sending }
    ] = useSendSelectedMutation();

    /** передаём Feature-компоненту callback */
    const handleSend = (opt: Option) => {

        sendSelected(opt.value);
    };

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 360, margin: 40 }}>
            <SelectAndSend
                list={options}
                loading={loadingOptions}
                error={Boolean(optionsError)}
                onSend={handleSend}
            />


            {serverMsg && (
                <p style={{ marginTop: 12 }}>{serverMsg.message}</p>
            )}
            {sendError && (
                <p style={{ marginTop: 12, color: "red" }}>Ошибка отправки</p>
            )}
        </div>
    );
}

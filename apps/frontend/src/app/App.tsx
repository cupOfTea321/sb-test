import React, { useState } from "react";
import {
    useGetOptionsQuery,
    useSendSelectedMutation,
} from "../services/api";
import "../shared/ui/Button/Button.css";
import "../app/index.css"
import {SelectAndSend} from "@/features/selectAndSend/ui/SelectAndSend";
import {Option} from "@/types";
export default function App() {
    const {
        data: options = [],
        isLoading: loadingOptions,
        isError:  optionsError
    } = useGetOptionsQuery();

    const [
        sendSelected,
        { data: serverMsg, error: sendError, isLoading: sending }
    ] = useSendSelectedMutation();

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
